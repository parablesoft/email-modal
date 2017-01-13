import Ember from 'ember';
import layout from '../templates/components/email-modal';

const {get,set,Component} = Ember;

const ON_CLOSE_ATTR = "on-close";
const ON_SEND_ATTR = "on-send-email";


export default Component.extend({
  layout,
  title: "Send Message",
  subject: "",
  message: "",
  to: "",
  "close-on-send": false,
  "action-button-default-text": "Send",
  "action-button-fulfilled-text": "Sent!",
  "action-button-pending-text": "Sending...",
  closeModal(close=true){
    if(close && this.attrs[ON_CLOSE_ATTR] != undefined){
       this.attrs[ON_CLOSE_ATTR]();
    }
  },
  actions:{
    closeModal(){
     this.closeModal();
    },
    sendEmail(model){
      let closeOnSend = get(this,"close-on-send");
      return new Ember.RSVP.Promise((resolve,reject)=>{
	let {to,cc,subject,message} = this.getProperties("to","cc","subject","message");
	let action = this.attrs[ON_SEND_ATTR](model,to,cc,subject,message);
	if(action===undefined){
	  this.closeModal(closeOnSend);
	  return resolve();
	}
	return action.then(()=>{
	  this.closeModal(closeOnSend);
	  resolve();
	},()=>{
	  reject();
	});
      });
    },
  }
});
