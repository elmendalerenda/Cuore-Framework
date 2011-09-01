var ButtonRenderer = new Class({
	Extends: Renderer,
	
	
	  initialize: function () {
	    	this.parent();
	    	this.DOMClass = "button";
    },
    
    draw: function (component) {
        this.panel = new Element("a", {
            id: this.innerDivName(component.getName()),
            href: "#"
        }).inject(this.container);
        this.span = new Element("span").inject(this.panel);
        
        this.panel.addClass(component.getButtonName());
        this.panel.addClass(this.DOMClass);
        this.updateWhenDrawn(component);
        
    },

    updateWhenDrawn: function (component) {
        this.putText(component);
        this.setClassCSS(component);
        this.addEvents(component);
        this.setCurrentClasses();
    },

    putText: function (component) {
        var text = component.getText() || component.getButtonName();
        this.span.set("text", text);
    },

    setClassCSS: function (component) {
	    var CSSDISABLED = 'disabled';
	  
	    if (!component.isEnable()) {
		    this.addClass(CSSDISABLED);
	    } else {
		    this.removeClass(CSSDISABLED);
	    } 
    },

    stopDefaultEvent:function (){
      this.panel.addEvent("click", function (e) {
                if (e) e.stop();
            });
    },
    
    addEvents: function (component) {
        this.panel.removeEvents('click');
        this.stopDefaultEvent();
        if (component.isEnable()) {
            this.panel.addEvent("click",component.click.bind(component));
        }
    },
});