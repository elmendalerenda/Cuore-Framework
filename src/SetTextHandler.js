var SetTextHandler = new Class({
    Extends: Handler,
    Implements: Debuggable,

    initalize: function () {
        this.typeName = "SetTextHandler";
    },

    handle: function (params) {
        this.debug("SetTextHandler.handle(params)");
        this.debug(params);
        this.debug(this.getOwner());
        this.debug("----------------------------");

        if (params) {
            var text = params.answer;
            this.getOwner().setText(text);
        }
    }
});
