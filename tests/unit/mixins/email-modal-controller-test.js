import Ember from 'ember';
import EmailModalControllerMixin from 'email-modal/mixins/email-modal-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | email modal controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let EmailModalControllerObject = Ember.Object.extend(EmailModalControllerMixin);
  let subject = EmailModalControllerObject.create();
  assert.ok(subject);
});
