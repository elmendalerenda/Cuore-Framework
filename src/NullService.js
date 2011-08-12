var NullService = new Class({
    Extends: Service,
    Implements: Debuggable,

	initialize: function () {
        this.typeName = "NullService";
	    this.name = "NULL";
    },

    execute: function (procedure, params, asynchronous) {
        this.debug("NullService.execute(procedure, params, asynchronous)");
        this.debug(procedure);
        this.debug(params);
        this.debug(asynchronous);
        this.debug("------------------------------------------------------");
    }
});