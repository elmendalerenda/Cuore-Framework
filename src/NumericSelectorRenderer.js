var NumericSelectorRenderer = new Cuore.Class({
    Extends: InputRenderer,

    initalize: function () {
        this.valueDisplayed = null;
    },

    draw: function (component) {
        this.parent(component);
        this.decorateInput();
        this.addMinusButton(component);
        this.addPlusButton(component);
    },

    addMinusButton: function (component) {
        this.minusButton = new Element("a", {
            href: "#",
            "class": "minusButton",
            html: "<span>-</span>"
        }).inject(this.panel);

        this.minusButton.addEvent("click", function (e) {
            if (e) e.stop();
        });

        this.minusButton.addEvent("click", component.minus.bind(component));
    },


    addPlusButton: function (component) {
        this.plusButton = new Element("a", {
            href: "#",
            "class": "plusButton",
            html: "<span>+</span>"
        }).inject(this.panel);

        this.plusButton.addEvent("click", function (e) {
            if (e) e.stop();
        });

        this.plusButton.addEvent("click", component.plus.bind(component));
    },


    decorateInput: function () {
        this.DOMInput.addClass("numericSelector");
        this.DOMInput.addEvent("focus", this.clearInput.bind(this));
        this.DOMInput.addEvent("blur", this.restoreInput.bind(this));
    },


    clearInput: function () {
        this.valueDisplayed = this.getValue();
        this.DOMInput.set("value", "");
    },

    restoreInput: function () {
        var value = this.getValue();
        if (this.isIncorrect(value) || !this.isInteger(value)) {
            value = this.valueDisplayed;
        }
        this.DOMInput.set("value", value);
    },


    isIncorrect: function (value) {
        var trimmedValue = value.replace(/^\s+|\s+$/g, "");
        var noNumber = isNaN(trimmedValue);
        var isEmpty = (!trimmedValue);
        return noNumber || isEmpty;
    },

    isInteger: function (value) {
        var parsed = parseInt(value);
        if (isNaN(parsed)) return;
        var isEquals = (parsed == value) && (value.toString() === parsed.toString())
        return isEquals;
    },

    updateWhenDrawn: function (component) {
        this.parent(component);
        this.checkDecorations(component);
    },

    checkDecorations: function (component) {
        var value = parseInt(this.getValue());

        this.plusButton.removeClass("off");
        this.minusButton.removeClass("off");

        if ((value + component.incrementer) > component.limSup) {
            this.plusButton.addClass("off");
        }

        if ((value - component.incrementer) < component.limInf) {
            this.minusButton.addClass("off");
        }
    },

});