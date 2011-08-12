var ButtonService = new Class({
	Extends: Service,

    initalize: function() {
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