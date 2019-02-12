import Ember from 'ember';
import layout from '../templates/components/email-modal';

const {get, set, Component} = Ember;

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

  buttonState: 'default',

  closeModal(close = true) {
    if (close && this.attrs[ON_CLOSE_ATTR] != undefined) {
      this.attrs[ON_CLOSE_ATTR]();
    }
  },

  isDefault: Ember.computed.equal("buttonState", 'default'),
  isPending: Ember.computed.equal("buttonState", 'pending'),
  isFulfilled: Ember.computed.equal("buttonState", 'fulfilled'),

  actions: {

    closeModal() {
      this.closeModal();
    },

    async sendEmail(model) {
      this.set('buttonState', 'pending')

      let closeOnSend = this.get("close-on-send")
      let {to, cc, subject, message} = this.getProperties(
        "to", "cc", "subject", "message"
      )

      let action = this.attrs[ON_SEND_ATTR]

      if (action === undefined) {
        this.closeModal(closeOnSend);
        this.set('buttonState', 'fulfilled')
      }

      try {
        await action(model, to, cc, subject, message)
        this.closeModal(closeOnSend)
        this.set('buttonState', 'fulfilled')
      } catch(e) {
        console.log(e)
        alert("There was an error sending the email, please try again.")
        this.set('buttonState', 'error')
      }

    }
  }
});
