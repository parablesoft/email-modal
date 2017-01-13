/*jshint node:true*/
module.exports = {
  description: '',
  normalizeEntityName: function() {},
  // locals: function(options) {
  //   // Return custom template variables here.
  //   return {
  //     foo: options.entity.options.foo
  //   };
  // }
  afterInstall: function(options) {
    return addAddonsToProject("ember-bootstrap","ember-font-awesome","ember-async-button");
  }
};
