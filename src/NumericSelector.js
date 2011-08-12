var NumericSelector = new Class({
	Extends: Input,
    include: Debuggable,
   
    initialize: function (key) {
        this.parent(key);
	    this.typeName = "NumericSelector";
	    this.limSup = 999999999999999999999999;
	    this.limInf = 0;
	    this.incrementer = 1;
        this.setRenderer(new NumericSelectorRenderer());
    },

    draw: function () {
        this.parent();
        this.setValue(this.getValue());
    },

    plus: function () {
        var value = parseInt(this.getValue()) + this.incrementer;
        this.setValue(value);
    },

    minus: function () {
        var value = this.getValue() - this.incrementer;
        this.setValue(value);
    },

    setValue: function (aValue) {
        var normalizedValue = this.normalizeValue(aValue);
        this.parent(normalizedValue);
        this.updateRender();
        this.notifyChanges();
    },

    normalizeValue: function (normalizedValue) {
        normalizedValue = (normalizedValue === "") ? this.limInf : normalizedValue;

        if (normalizedValue == null) {
            normalizedValue = normalizedValue || this.getValue();
        }
        normalizedValue = this.checkLimits(normalizedValue);
        normalizedValue = this.snap(normalizedValue);

        return normalizedValue;
    },


    checkLimits: function (value) {
        var result = value;
        if (value >= this.limSup) {
            result = this.limSup;
        }

        if (value <= this.limInf) {
            result = this.limInf;
        }

        return result;
    },

    snap: function (value) {
        var result = parseInt(value / this.incrementer) * this.incrementer;
        return result;
    },


    notifyChanges: function () {
        var bus = this.getBus();
        var data = {};
        data.value = this.getValue().toInt();
        bus.emit("COMPONENT_" + this.name + "_CHANGED", data);
    },

    getBus: function () {
        return new Bus();
    },

    setLimSup: function (newLimSup) {
        if (newLimSup < this.limInf) {
            newlimSup = this.limInf;
        }
        this.limSup = newLimSup;
        this.setValue(null);
    },

    getLimSup: function () {
        return this.limSup;
    },

    setLimInf: function (newLimInf) {
        if (newLimInf > this.limSup) {
            newLimInf = this.limSup;
        }
        this.limInf = newLimInf;
        this.setValue(null);
    },

    getLimInf: function () {
        return this.limInf;
    },

    setIncrementer: function (newIncrementer) {
        this.incrementer = newIncrementer;
    },

});