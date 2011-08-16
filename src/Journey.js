var Journey = new Cuore.Class({

    initialize: function (start, end) {
        var allValues = (start && end);

        this.itsGranularity = 60;
        this.minutesInAnHour = 60;
        this.start = allValues ? this.convertToMinutesDay(start) : 0;
        this.end = allValues ? this.convertToMinutesDay(end) : 1440;
    },

    starts: function () {
        return this._normalize(this.start);
    },

    ends: function () {
        return this._normalize(this.end);
    },

    granularity: function () {
        return this.itsGranularity;
    },

    withGranularityOf: function (granularity) {
        this.itsGranularity = parseInt(granularity);
    },

    _normalize: function (hour) {
        if (!isNaN(hour)) {
            return this.formatHour(hour);
        }
    },

    convertToMinutesDay: function (anHour) {
        var hoursInADay = 24;
        var hour = this._parseHour(anHour);
        var minutes = this._parseMinutes(anHour);
        var notValidMinute = (minutes >= this.minutesInAnHour) || (minutes < 0);
        var notValidHour = (hour > hoursInADay) || (hour < 0);

        if (notValidMinute || notValidHour) return null;

        return (hour * this.minutesInAnHour) + minutes;
    },

    _parseHour: function (anHour) {
        return Number(this._getChunks(anHour)[0]);
    },

    _parseMinutes: function (anHour) {
        return ~~ (this._getChunks(anHour)[1]);
    },

    _getChunks: function (anHour) {
        var anHour = anHour.toString();
        return anHour.split(":", 2);
    },

    formatHour: function (minutes) {
        var firstNumberWith2Digits = 10;
        var hour = Math.floor(minutes / this.minutesInAnHour);
        var minutes = minutes % this.minutesInAnHour;
        var formatedMinutes = minutes < firstNumberWith2Digits ? "0" + minutes : minutes;
        var formatedHour = hour < firstNumberWith2Digits ? "0" + hour : hour;

        return formatedHour + ":" + formatedMinutes;
    },

    isValid: function () {
        return this.start < this.end;
    },

    slots: function () {
        var theSlots = [];
        var finalMinute = this.end - this.itsGranularity;
        var index = 0;
        for (var initialMinute = this.start; initialMinute <= finalMinute; initialMinute += this.itsGranularity) {
            var journeyStart = this.formatHour(initialMinute);
            var journeyEnd = this.formatHour(initialMinute + this.itsGranularity);
            theSlots[index++] = new Journey(journeyStart, journeyEnd);
        }

        var lastSlotEnds = theSlots[index - 1].ends();
        if (lastSlotEnds !== this.ends()) {
            theSlots[index] = new Journey(lastSlotEnds, this.ends());
        }

        return theSlots;
    },

    toString: function () {
        return this.starts() + "-" + this.ends();
    },

    setStartTime: function (hour) {
        if (!hour) return;

        this.start = this.convertToMinutesDay(hour);
        if (this.start >= this.end) {
            this.start = this.end - this.itsGranularity;
        }
    },

    setEndTime: function (dayTime) {
        if (!dayTime) return;

        this.end = this.convertToMinutesDay(dayTime);
        if (this.end <= this.start) {
            this.end = this.start + this.itsGranularity;
        }
    }

});