var ExecutorHandler = new Cuore.Class({
    Extends: Handler,

    initialize: function (ownerFunction) {
        this.typeName = 'ExecutorHandler';
        this.ownerFunction = ownerFunction;
    },

    handle: function (params) {
        this.getOwner()[this.ownerFunction](params);
    }

});
