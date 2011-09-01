var TimeRange = new Class({
	Extends: Component,

    initialize: function (key, granularity) {
        this.parent();
        this.typeName = 'TimeRange';
	    this.label = null;
	    this.startHourSelect = null;
	    this.endHourSelect = null;
        this.setRenderer(new TimeRangeRenderer());
        this.journey = new Journey();
        if (granularity) {
            this.journey.withGranularityOf(granularity);
        }
        this.setI18NKey(key);
    },

    setStartHour: function (hour) {
        var anHour = hour 
        if (hour.target) anHour = this.renderer.getStartTime();
        
        this.journey.setStartTime(anHour);
        this.updateRender();
        this.emitValues();
    },

    setEndHour: function (hour) {
         var anHour = hour 
        if (hour.target) anHour = this.renderer.getEndTime();
        this.journey.setEndTime(anHour);
        
        this.updateRender();
        this.emitValues();
    },


    setText: function (aText) {
        this.text = aText;
        this.updateRender();
    },

    emitValues: function () {
        var bus = this.getBus();
        var params = {
            "startHour": this.getStartHour(),
            "endHour": this.getEndHour()
        };
        bus.emit("COMPONENT_" + this.name + "_CHANGED", params);
    },

    getBus: function () {
        return new Bus();
    },

    getStartHour: function () {
        return this.journey.starts();
    },

    getEndHour: function () {
        return this.journey.ends();
    }

});