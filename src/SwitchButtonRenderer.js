var SwitchButtonRenderer = new Cuore.Class({
    Extends: ButtonRenderer,

    putText: function (component) {
        if (component.isActive()) {
            this._putActiveText(component);
        } else {
            this._putInactiveTexT(component);
        }
    },

    _putActiveText: function (component) {
        var label = component.activeLabel;
        var key = component.activeKey;

        this._putText(label || key);
    },

    _putInactiveTexT: function (component) {
        var label = component.inactiveLabel;
        var key = component.inactiveKey;

        this._putText(label || key);
    },

    _putText: function (text) {
        this.span.set("text", text);
    },

    setClassCSS: function (component) {
        this.parent(component);
        if (!this.panel) return;

        var OFF = 'off';
        var ON = 'on';

        var newClass = component.active ? ON : OFF;
        var oldClass = component.active ? OFF : ON;

        this.addClass(newClass);
        this.removeClass(oldClass);
    },

});