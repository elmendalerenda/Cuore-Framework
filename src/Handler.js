var Handler = new Cuore.Class({

    initialize: function () {
        this.owner = null;
        this.typeName = 'Handler';
    },

    handle: function (params) {},

    dispatch: function (params) {
        this.handle(params);
    },

    setOwner: function (anObject) {
        this.owner = anObject;
    },

    getOwner: function () {
        return this.owner;
    },

    getPage: function () {
        return document.page;
    }

});
