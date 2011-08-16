var SwitchCollapseAndUncollapseHandler = new Cuore.Class({
    Extends: Handler,

    initialize: function () {
        this.typeName = "SwitchCollapseAndUncollapseHandler";
    },

    handle: function () {
        var owner = this.owner;
        var isCollapsed = owner.isCollapsed();
        return (isCollapsed) ? owner.uncollapse() : owner.collapse();
    }
});