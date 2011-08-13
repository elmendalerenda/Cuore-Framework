var NestableComponent = new Class({
    Extends: Component,
    hostedComponents: [],

    host: function (anyComponent) {
        this.hostedComponents.push(anyComponent);
    },

    hosted: function (anyComponent) {
        return this.hostedComponents;
    },

    getManagedEvents: function () {
        var result = this.parent();
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            result.combine(aComponent.getManagedEvents());
        }
        return result;
    },

    eventDispatch: function (eventName, params) {
        console.log('Before Super: ' + this.handlers);
        this.parent(eventName, params);
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.eventDispatch(eventName, params);
        }
    },

    draw: function () {
        this.parent();
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.setContainer(this.$(this.renderer.innerDivName(this.name)));
            aComponent.draw();
        }
    },

    $: function (element) {
        return document.getElementById(element);
    },

    destroy: function () {
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.destroy();
        }
        this.parent();
    },

    setName: function (name) {
        this.parent(name);
        var ordinal = 1;
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.setName(this.getName() + this.SEPARATOR + aComponent.getName() + this.SEPARATOR + ordinal);
            ordinal++;
        }
    },

});
