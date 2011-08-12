var Service = new Class({

	initialize: function () {
	    this.name = 'ABSTRACT';
	    this.typeName = 'Service';
	    this.executionPrefix = 'EXECUTED';  
	    this.SEPARATOR = '_';
	    this.lastDataSent = null;
		this.baseURL = '';     
    },

    execute: function (procedure, params, asynchronous) {
        var eventName = this.getEventNameForExecution(procedure);
        this[procedure](params, eventName);

        if (!asynchronous) {
            this.emit(eventName, params);
        }
    },

    request: function (url, params, eventName) {
        new Request.JSON({
            url: url,
            data: {
                "query": JSON.encode(params)
            },
            onComplete: function (response) {
                this.emit(eventName, response);

            }.bind(this)
        }).send();

        this.lastDataSent = params;
    },

    emit: function (eventName, params) {
        this.getBus().emit(eventName, params);
    },

    getEventNameForExecution: function (procedure) {
        return this.getName() + this.SEPARATOR + procedure + this.SEPARATOR + this.executionPrefix;
    },

    getName: function () {
        return this.name;
    },

    getLastDataSent: function () {
        return this.lastDataSent;
    },

    getBaseURL: function () {
        return this.baseURL;
    },

    setBaseURL: function (baseURL) {
        this.baseURL = baseURL;
    },

    getBus: function () {
        return new Bus();
    }
});