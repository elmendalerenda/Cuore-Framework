var Component = new Cuore.Class({

    initialize: function () {
        this.LABELSERVICENAME = 'LABELS';
        this.name = 'aComponent';
        this.typeName = 'Component';
        this.service = 'NULL';
        this.procedure = 'nullProcedure';
        this.I18NKey = null;
        this.handlers = {};
        this.SEPARATOR = '_';
        this.text = '';
        this.renderer = new Renderer();
    },

    initializeExecutionContext: function (service, procedure) {
        if (service && procedure) {
            this.service = service;
            this.procedure = procedure;
        }
    },

    draw: function () {
        this.render();
        this.getLabel();
    },

    render: function () {
        this.renderer.render(this);
    },

    updateRender: function () {
        this.renderer.update(this);
    },

    destroy: function () {
        this.renderer.erase();
        var bus = new Bus();
        bus.unsubscribe(this, this.getManagedEvents());
    },

    execute: function (aService, aProcedure, params, asynchronous) {
        var theService = aService || this.service;
        var theProcedure = aProcedure || this.procedure;
        var serviceInstance = this.getService(theService);

        if (serviceInstance) {
            serviceInstance.execute(theProcedure, params, asynchronous);
        }
    },

    eventDispatch: function (eventName, params) {
        var eventsToDispatch = this.handlers[eventName];
        if (!eventsToDispatch) return;

        for (var i = 0, handler; handler = eventsToDispatch[i]; i++) {
            handler.handle(params);
        }
    },

    addHandler: function (eventName, handler) {
        this.handlers[eventName] = this.handlers[eventName] || [];
        handler.setOwner(this);
        this.handlers[eventName].push(handler);
    },

    addDispatcher: function (eventName, handler) {
        this.addHandler(eventName, handler);
    },

    addClass: function (aClass) {
        this.renderer.addClass(aClass);
    },

    removeClass: function (aClass) {
        this.renderer.removeClass(aClass);
    },

    getText: function () {
        return this.text;
    },

    getTypeName: function () {
        return this.typeName;
    },

    getName: function () {
        return this.name;
    },

    setName: function (name) {
        this.name = name;
    },

    setContainer: function (container) {
        this.renderer.setContainer(container);
    },

    getContainer: function () {
        return this.renderer.getContainer();
    },
    
    getService: function (aService) {
        var theService = aService || this.service;
        return document.page.getService(theService) || null;
    },

    getLabelService: function () {
        return this.getService(this.LABELSERVICENAME);
    },

    getLabel: function () {
        if (!this.I18NKey || !this.getLabelService()) return;

        var params = {
            key: this.I18NKey
        };

        this.getLabelService().execute('getLabel', params, true);
    },

    getUniqueID: function () {
        return this.renderer.innerDivName(this.name);
    },

    getManagedEvents: function () {
        // @TODO map
        var handlersKeys = [];
        for (var handler in this.handlers) {
            handlersKeys.push(handler);
        }
        return handlersKeys;
    },

    setText: function (text) {
        this.text = text;
        this.updateRender();
    },

    setI18NKey: function (key) {
        if (!key) return;

        this.I18NKey = key;
        this.addHandler('LABELS_getLabel_EXECUTED_' + key, new SetTextHandler());
        new Bus().subscribe(this, 'LABELS_getLabel_EXECUTED_' + key);
        this.getLabel();
    },

    getI18NKey: function () {
        return this.I18NKey;
    },

    setRenderer: function (renderer) {
        this.renderer = renderer;
    }
});
