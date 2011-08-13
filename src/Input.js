var Input = new Class({
    Extends: Component,

    initialize: function (key, type) {
        this.parent();
        this.setRenderer(new InputRenderer());
        this.setI18NKey(key);

        this.typeName = "Input";
        this.type = type || 'text';
        this.value = '';
        this.disabled = false;
    },

    setText: function (aText) {
        this.text = aText;
    },

    getValue: function () {
        return this.renderer.getValue() || this.value;
    },

    setValue: function (value) {
        this.value = value;
        this.updateRender();
    },

    disable: function () {
        this.disabled = true;
        this.updateRender();
    },

    enable: function () {
        this.disabled = false;
        this.updateRender();
    }
});