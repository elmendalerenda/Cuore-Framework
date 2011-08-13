var ButtonRenderer = new Class({
    Extends: Renderer,

    draw: function (component) {
        this.panel = new Element("a", {
            id: this.innerDivName(component.getName()),
            href: "#"
        }).inject(this.container);

        this.panel.addClass(component.getButtonName());

        this.span = new Element("span").inject(this.panel);
    },

    updateWhenDrawn: function (component) {
        console.log('test');
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

    addEvents: function (component) {
        this.panel.removeEvents('click');

        if (component.isEnable()) {
            this.panel.addEvent("click", function (e) {
                if (e) e.stop();
            });
            this.panel.addEvent("click", component.click.bind(component));
        }
    },
});
