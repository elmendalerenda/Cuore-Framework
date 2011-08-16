var InputRenderer = new Cuore.Class({
    Extends: Renderer,

    draw: function (component) {
        this.panel = new Element('div', {
            'id': this.innerDivName(component.getName())
        }).inject(this.container);

        this.label = new Element("label", {});
        this.addClass('inputJS');

        this.DOMInput = new Element("input", {
            type: component.type
        }).inject(this.panel);

        this.label.inject(this.panel, "top");
    },

    updateWhenDrawn: function (component) {
        this.label.set('text', component.getText());
        this.DOMInput.set('value', component.value);
        this.DOMInput.set('disabled', component.disabled);
        this.setCurrentClasses();
    },

    getValue: function () {
        if (this.isDrawn()) {
            return this.DOMInput.get('value');
        }
    },

});
