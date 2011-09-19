var SetTextHandler = new Cuore.Class({
    Extends: Handler,
    Implements: Debuggable,

    initalize: function () {
        this.typeName = "SetTextHandler";
    },

    handle: function (response) {
        this.debug("SetTextHandler.handle(response)");
        this.debug(response);
        this.debug(this.getOwner());
        this.debug("----------------------------");

        var theMessage = response;
        var text = theMessage.getFromAnswer("text");
        if (text != ""){
            this.getOwner().setText(text);
        }
    }
});
