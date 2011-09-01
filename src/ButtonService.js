var ButtonService = new Cuore.Class({
    Extends: Service,

    initialize: function() {
      this.parent();
	    this.name = 'BUTTON';
	    this.typeName = 'ButtonService';
	    this.executionPrefix = 'CLICKED';	
    },

    execute: function (procedure, params) {
        params = params || {};
        params.buttonName = procedure;

        var eventName = this.name + this.SEPARATOR + procedure + this.SEPARATOR + this.executionPrefix;
        this.emit(eventName, params);
    }
});