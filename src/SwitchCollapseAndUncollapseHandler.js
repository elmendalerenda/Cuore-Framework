var SwitchCollapseAndUncollapseHandler = new Class({
    Extends: Handler,

    initialize: function () {
        this.typeName = "SwitchCollapseAndUncollapseHandler";
    },

    handle: function () {
        if (this.owner.isCollapsed()) {
            return this.owner.uncollapse();
        }
        this.owner.collapse();
    }
});