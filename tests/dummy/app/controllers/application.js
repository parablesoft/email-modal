import Ember from 'ember';


const {set,Controller} = Ember;
export default Controller.extend({
  toggleModal(modal,show=true){
    set(this,modal,show);
  },
  actions:{
    openModal(modal){
      this.toggleModal(modal);
    },
    closeModal(modal){
      this.toggleModal(modal,false);
    },
    asyncSendEmail(){
      return new Ember.RSVP.Promise((resolve)=>{
	return Ember.run.later(this,function(){
	  resolve();
	},1500);
      });
    },
  }
});
