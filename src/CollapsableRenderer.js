var CollapsableRenderer = new Cuore.Class({
    Extends: Renderer,

    updateWhenDrawn: function (component) {
        this.parent(component);
        this.collapseBehaviour(component);
        this.setCurrentClasses();
    },

    collapseBehaviour: function (component) {
        var COLLAPSED = "collapsed",
            UNCOLLAPSED = "uncollapsed";

        this.removeClass(COLLAPSED);
        this.removeClass(UNCOLLAPSED);

        if (component.isCollapsed()) {
             this.panel.setStyles({
            'height': '0px',
            'overflow': 'hidden',
            'padding-top': '0px',
            'padding-bottom': '0px'
            });
            this.addClass(COLLAPSED);
        } else {
            this.panel.setStyle('height', this.panel.getScrollSize().y);
            this.addClass(UNCOLLAPSED);
        }
    },
});
