var Renderer = Class.$extend({
	
	__init__: function(){
	    this.panel = null;
	    this.panelClasses = ["innerComponentDiv"];
	    this.container = document.body;
	    this.self = this;
	},

    setContainer:function(aContainer) {
        this.container = document.getElementById(aContainer);
    },

	getContainer: function() {
        return this.container;
    },

    render: function(component) {
        if (!this.isDrawn()) {
            this.draw(component);
        }
        this.update(component)
    },

    update: function(component) {
        if (this.isDrawn()) {
            this.updateWhenDrawn(component);
        }
    },

    erase: function() {
        var erase = this.panel;

        if (erase) {
            this.container.removeChild(erase);
        }
    },

    addClass: function(aClass) {
        this.panelClasses.push(aClass);
        if (this.isDrawn()) {
            this.panel.className += ' ' + aClass;
        }
    },

    removeClass: function(aClass) {
        this.eraseClassFromPanel(this.panelClasses, aClass); // @TODO
        if (this.isDrawn()) {
            var reg = new RegExp("(^|\\s)" + aClass + "(\\s|$)", "g");
            this.panel.className = this.panel.className.replace(reg, '');
        }
    },

    getCurrentClasses: function() {
        return this.panelClasses;
    },

    innerDivName: function(componentName) {
        var divNameSuffix = "_inner"
        return componentName + divNameSuffix;
    },

    draw: function(component) {
        var divID = this.innerDivName(component.getName());

        this.panel = document.createElement('div');
        this.panel.id = divID;
        this.container.appendChild(this.panel);

        this.setCurrentClasses();
    },

    updateWhenDrawn: function(component) {
        if (component.getText()) {
            this.panel.set('text', component.getText());
        }
    },

    setCurrentClasses :function() {
        for (var i = 0, oneClass; oneClass = this.panelClasses[i]; i++) {
            this.panel.addClass(oneClass);
        }
    },

    isDrawn: function() {
        return this.panel;
    },

    eraseClassFromPanel: function(arrayName, arrayElement) {
        for (var i = 0, len = arrayName.length; i < len; i++) {
            if (arrayName[i] === arrayElement) {
                arrayName.splice(i, 1);
            }
        }
        return arrayName;
    }

});	