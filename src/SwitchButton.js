var SwitchButton = new Cuore.Class({
    Extends: Button,

    initialize: function (buttonName, activeKey, inactiveKey) {
        this.parent(buttonName);
        this.typeName = "SwitchButton";
        this.active = true;
        this.activeLabel = this.text;
        this.inactiveLabel = this.text;
        this.activeKey = activeKey;
        this.inactiveKey = inactiveKey;
        this.renderer = new SwitchButtonRenderer();

        this.addLabelHandler(this.activeKey, "setActiveLabel");
        this.addLabelHandler(this.inactiveKey, "setInactiveLabel");
    },

    addLabelHandler: function (key, procedure) {
        this.addHandler("LABELS_getLabel_EXECUTED_" + key, new ExecutorHandler(procedure))
    },

    draw: function () {
        this.getLabel(this.activeKey);
        this.getLabel(this.inactiveKey);
        this.render();
    },

    click: function (executeParent) {
        var isNotDefined = (executeParent === undefined);
        if (executeParent || isNotDefined) {
            this.parent();
        }

        this.switchState();
    },

    switchState: function () {
        this.active = !this.active;
        this.updateRender();
    },

    isActive: function () {
        return this.active;
    },

    getLabel: function (key) {
        if (!key) return;
        var labelService = this.getLabelService();
        var params = {
            "key": key
        };
        if (labelService) {
            labelService.execute("getLabel", params, true);
        }
    },

    setActiveLabel: function (message) {
        this.activeLabel = message.answer;
        this.updateRender();
    },

    setInactiveLabel: function (message) {
        this.inactiveLabel = message.answer;
        this.updateRender();
    },

    getActiveLabel: function () {
        return this.activeLabel;
    },

    getInactiveLabel: function () {
        return this.inactiveLabel;
    },

    getActiveKey: function () {
        return this.activeKey;
    },

    getInactiveKey: function () {
        return this.inactiveKey;
    }

});