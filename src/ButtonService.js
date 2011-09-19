var ButtonService = new Cuore.Class({
    Extends: Service,

    initialize: function() {
      this.parent();
	    this.name = 'BUTTON';
	    this.typeName = 'ButtonService';
	    this.executionPrefix = 'CLICKED';	
    },

    execute: function (procedure, params) {
	var theMessage = new Message();
	theMessage.putMapOnQuery(params);
        params = params || {};
        params.buttonName = procedure;
	
	theMessage.putOnQuery("buttonName",procedure);
        var eventName = this.name + this.SEPARATOR + procedure + this.SEPARATOR + this.executionPrefix;
        this.emit(eventName, theMessage.asJson());
    }
});