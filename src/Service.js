var Service = Class.$extend({

    __init__: function () {
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
       
        var theMessage = new Message();
        theMessage.putMapOnQuery(params);
        this.lastDataSent = theMessage;

        if (!asynchronous) {            
            this.emit(eventName, theMessage.asJson());
        }
    },

    request: function (url, params, eventName) {
        var theMessage=new Message();
        theMessage.putMapOnQuery(params);
        this.lastDataSent = theMessage;
        
        new Request.JSON({
            url: url,
            data: {
                "query": theMessage.asJson()
            },
            onComplete: function (response) {
                this.emit(eventName, response);
            }.bind(this)
        }).send();        
    },

    emit: function (eventName, response) {
        var theMessage= new Message(response);
        this.lastDataSent = theMessage;
        this.getBus().emit(eventName, theMessage);
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