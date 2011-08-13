var CollapsablePanel = new Class({
    Extends: Component,

    initialize: function (service, procedure) {
        this.parent(service, procedure);
        this.typeName = "CollapsablePanel";
        this.collapsed = true;
        this.renderer = new CollapsableRenderer();
        this.addClass("collapsablePanel");
    },

    draw: function () {
        this.render();
    },

    isCollapsed: function () {
        return this.collapsed;
    },

    uncollapse: function () {
        this.collapsed = false;
        this.updateRender();
    },

    collapse: function () {
        this.collapsed = true;
        this.updateRender();
    },

});