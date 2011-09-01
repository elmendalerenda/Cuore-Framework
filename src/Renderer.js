var Renderer = new Cuore.Class({

    initialize: function () {
	    this.panel = null;
	    this.panelClasses = ["innerComponentDiv"];
      this.container = document.body;
    },

    setContainer: function (aContainer) {
        this.container = $(aContainer);
    },

    getContainer: function () {
        return this.container;
    },

    innerDivName: function (componentName) {
        var divNameSuffix = "_inner"
        return componentName + divNameSuffix;
    },

    render: function (component) {
        if (!this.isDrawn()) {
            this.draw(component);
        }
        this.update(component)
    },

    draw: function (component) {
        this.panel = new Element('div', {
            'id': this.innerDivName(component.getName())
        }).inject(this.container);

        this.setCurrentClasses();
    },

    isDrawn: function () {
        return this.panel;
    },

    update: function (component) {
        if (this.isDrawn()) {
            this.updateWhenDrawn(component);
        }
    },

    updateWhenDrawn: function (component) {
        this.panel.set('text', component.getText());
    },

    erase: function () {
        var erase = this.panel;
        if (erase) {
            $(erase).destroy(); // @TODO
        }
    },

    setCurrentClasses: function () {
        for (var i = 0, oneClass; oneClass = this.panelClasses[i]; i++) {
            this.panel.addClass(oneClass);
        }
    },

    addClass: function (aClass) {
        this.panelClasses.push(aClass);
        if (this.panel) {
            this.panel.addClass(aClass);
        }
    },

    removeClass: function (aClass) {
        this.panelClasses.erase(aClass);
        if (this.panel) {
            this.panel.removeClass(aClass);
        }
    },

    getCurrentClasses: function () {
        return this.panelClasses;
    },

});