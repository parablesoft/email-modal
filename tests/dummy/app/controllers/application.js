import Ember from 'ember';


const {Controller} = Ember;
export default Controller.extend({
  actions:{
    closeModal(){
      window.alert("MORE STUFF ON CLOSE!");
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
