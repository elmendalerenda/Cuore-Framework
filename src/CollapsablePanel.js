var CollapsablePanel = new Class({
	Extends: NestableComponent,

    initialize: function (service, procedure) {
        this.parent(service, procedure);
        this.typeName = "CollapsablePanel";
        this.collapsed = true;
        this.renderer = new CollapsableRenderer();
        this.addClass("collapsablePanel");
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