
var NestableComponent = Component.$extend({
    //Extends: Component,
    
    
    __init__: function(){
        this.$super();
        this.hostedComponents= [];    
    },

    host: function (anyComponent) {
        this.hostedComponents.push(anyComponent);
    },

    hosted: function (anyComponent) {
        return this.hostedComponents;
    },

    getManagedEvents: function () {
        var result = this.$super();
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            result.combine(aComponent.getManagedEvents());
        }
        return result;
    },

    eventDispatch: function (eventName, params) {
        this.$super(eventName, params);

        //this.parent(eventName, params);
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.eventDispatch(eventName, params);
        }
    },

    draw: function () {
        this.$super();
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.setContainer($(this.renderer.innerDivName(this.name)));
            aComponent.draw();
        }
    },

    updateRender: function () {
        this.$super();
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.updateRender();
        }
    },
    

    destroy: function () {
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.destroy();
        }
        this.$super();
    },

    setName: function (name) {
        this.$super(name);
        var ordinal = 1;
        for (var i = 0, aComponent; aComponent = this.hostedComponents[i]; i++) {
            aComponent.setName(this.getName() + this.SEPARATOR + aComponent.getName() + this.SEPARATOR + ordinal);
            ordinal++;
        }
    },

});
