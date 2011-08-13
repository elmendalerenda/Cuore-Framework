var Page = new Class({

    initialize: function (baseURL) {
        this.services = {};
        this.components = {};
        this.cleaners = [];
        document.page = this;
        this.baseURL = baseURL || '';
        this.addService(new LabelsService());
        this.setUp();
    },

    initializeServices: function () {},
    initializeComponents: function () {},

    setUp: function () {
        this.initializeServices();
        this.initializeComponents();
    },

    addService: function (service) {
        service.setBaseURL(this.getBaseURL());
        this.services[service.getName()] = service;
    },

    getService: function (name) {
        return this.services[name] || new NullService();
    },

    addComponent: function (component, container, replaceContent) {
        this.subcribeComponentEvents(component);
        component.setName(this.generateUUID());
        this.components[component.getName()] = component;

        if (replaceContent) {
            this.cleaners.push(component.getName());
        }
        component.setContainer(container);
    },

    subcribeComponentEvents: function (component) {
        var events = component.getManagedEvents();
        for (var i = 0, eventName; eventName = events[i]; i++) {
            (new Bus()).subscribe(component, eventName);
        }
    },

    draw: function () {
        for (var component in this.components) {
            var currentComponent = this.getComponent(component);

            if (this.cleaners.indexOf(currentComponent.getName()) >= 0) {
                this.$(currentComponent.getContainer()).innerHTML = '';
            }
            currentComponent.draw();
        }
    },
    // @TODO
    $: function (name) {
        return document.getElementById(name);
    },

    getComponent: function (name) {
        return this.components[name] || null;
    },

    getBaseURL: function () {
        return this.baseURL;
    },

    generateUUID: function () {
        var S4Pattern = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
        var S4 = S4Pattern.replace(/[xy]/g, function (group) {
            var randomNumber = Math.random() * 16 | 0,
                value = group === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8);

            return value.toString(16);
        });
        return S4;
    }
});
