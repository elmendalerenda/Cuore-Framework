var Debuggable = new Cuore.Class({

    debug: function (object) {
        var debugModeON = (document.debugMode == true);
        var debugThisType = document.debugTypes && (document.debugTypes[this.typeName] === true);

        if (debugModeON || debugThisType) {
            console.log(object);
        }
    }
});
