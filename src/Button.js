var Button = new Cuore.Class({
    Extends: Component,

    initialize: function (buttonName, key) {
        this.parent();
        this.typeName = 'Button';
        this.service = 'BUTTON';
        this.procedure = 'aButton';
        this.BUTTONSERVICE = "BUTTON";
        this.DOMClass = "button";
        this.data = null;
        this.text = 'CLICK!';
        this.buttonName = "aButton";
        this.enabled = true;
        this.asynchronous = false;
        this.renderer = new ButtonRenderer();
        this.initializeExecutionContext(this.BUTTONSERVICE, buttonName);
        this.buttonName = this.procedure;
        this.setI18NKey(key);
    },

    click: function () {
        var service = this.getService();
        if (service) {
            service.execute(this.buttonName, this.data);
        }
    },

    disable: function () {
        this.enabled = false;
        this.updateRender();
    },

    enable: function () {
        this.enabled = true;
        this.updateRender();
    },

    getButtonName: function () {
        return this.buttonName;
    },

    setData: function (data) {
        this.data = data;
    },

    isEnable: function () {
        return this.enabled;
    }
});