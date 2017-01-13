# email-modal
This is an ember addon which uses an ember-bootstrap modal to display an poor man's email client. Front-end implementation only. 


## Installation

ember-install email-modal



## Usage

Will be updating this soon. Below is only a simple example. There are many other options. In the template, you can use a block version which allows you to pass in content that will be displayed on the right side of the modal.


**template**
```
<button {{action "openModal"}}>Open</button>
{{#if isShowingModal}}
	{{email-modal 
		on-close=(action "closeModal") 
		on-send-email=(action "asyncSendEmail")
	}}
{{/if}}

```

**controller or component**
```
import Ember from 'ember';

const {set,Controller} = Ember;
export default Controller.extend({
  toggleModal(show=true){
    set(this,"isShowingModal",show);
  },
  actions:{
    openModal(){
      this.toggleModal();
    },
    closeModal(){
      this.toggleModal(false);
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

```