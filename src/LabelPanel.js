var LabelPanel = new Cuore.Class({
    Extends: Component,

    initialize: function (key) {
        this.parent();
        this.typeName = "LabelPanel";
        this.LABELSERVICENAME = "LABELS";
        this.setI18NKey(key);
    },

    draw: function () {
        this.parent();
        this.addClass("labelPanel");
    }
});