/*jshint node:true*/

module.exports = {
  description: '',
  normalizeEntityName: function() {},
  afterInstall: function(options) {
    return this.addAddonsToProject({
      packages: [
        { name: 'ember-bootstrap', target: '0.11.3' },
        { name: 'ember-font-awesome', target: '2.2.0' },
      ],
      blueprintOptions: {
        saveDev: true
      }
    });
  }
};
