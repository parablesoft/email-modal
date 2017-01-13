import Ember from 'ember';
import layout from '../templates/components/email-modal';

const {get,set,Component} = Ember;

const TRIGGER_TEXT = "Send an email";
const ON_CLOSE_ATTR = "on-close";
const ON_SEND_ATTR = "on-send-email";


export default Component.extend({
  layout,
  isShowing:false,
  title: "Send Message",
  subject: "",
  message: "",
  to: "",
  "close-on-send": false,
  "action-button-default-text": "Send",
  "action-button-fulfilled-text": "Sent!",
  "action-button-pending-text": "Sending...",
  toggleModal(show=true){
    set(this,"isShowing",show);
    if(!show && this.attrs[ON_CLOSE_ATTR] != undefined){
       this.attrs[ON_CLOSE_ATTR]();
    }
  },
  "trigger-text": TRIGGER_TEXT,
  actions:{
    openModal(){
      this.toggleModal();
    },
    closeModal(){
     this.toggleModal(false);
    },
    sendEmail(model){
      let closeOnSend = get(this,"close-on-send");
      return new Ember.RSVP.Promise((resolve,reject)=>{
	let {to,cc,subject,message} = this.getProperties("to","cc","subject","message");
	let action = this.attrs[ON_SEND_ATTR](model,to,cc,subject,message);
	if(action===undefined){
	  this.toggleModal(!closeOnSend);
	  return resolve();
	}
	return action.then(()=>{
	  this.toggleModal(!closeOnSend);
	  resolve();
	},()=>{
	  reject();
	});
      });
    },
  }
});
