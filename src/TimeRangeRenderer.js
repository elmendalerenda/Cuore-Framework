var TimeRangeRenderer = new Class({
    Extends: Renderer,

    initalize: function () {
        this.label = null;
        this.startHourSelect = null;
        this.endHourSelect = null;
    },

    draw: function (component) {
        this.parent(component);
        this.panel.erase("text");
        this.addClass("timeRange");
        this.label = new Element("label").inject(this.panel);

        this.startHourSelect = new Element("select", {
            "class": "hourSelect startHourSelect"
        }).inject(this.panel);

        this.startHourSelect.addEvent("change", component.setStartHour.bind(component));

        this.endHourSelect = new Element("select", {
            "class": "hourSelect endHourSelect"
        }).inject(this.panel);

        this.endHourSelect.addEvent("change", component.setEndHour.bind(component));
    },

    getStartTime: function () {
        return this.startHourSelect.get("value");
    },

    getEndTime: function () {
        return this.endHourSelect.get("value");
    },

    setOptions: function (component) {
        this.constructStartOptions(component);
        this.constructEndOptions(component);
    },

    constructStartOptions: function (component) {
        this.clearOptions(this.startHourSelect);
        var slots = this.getSlots("00:00", component.journey.ends(), component.journey.granularity());

        for (var i = 0, slot; slot = slots[i]; i++) {
            new Element('option', {
                "value": slot.starts(),
                "text": slot.starts()
            }).inject(this.startHourSelect);
        }
    },

    constructEndOptions: function (component) {
        this.clearOptions(this.endHourSelect);
        var slots = this.getSlots(component.journey.starts(), "24:00", component.journey.granularity());

        for (var i = 0, slot; slot = slots[i]; i++) {
            new Element('option', {
                "value": slot.ends(),
                "text": slot.ends()
            }).inject(this.endHourSelect);
        }
    },

    getSlots: function (start, end, granularity) {
        var aJourney = new Journey(start, end);
        aJourney.withGranularityOf(granularity);

        return aJourney.slots();
    },

    clearOptions: function (selectElement) {
        var options = selectElement.getChildren("option");

        for (var i = 0, item; item = options[i]; i++) {
            item.destroy();
        }
    },

    updateWhenDrawn: function (component) {
        this.label.set("text", component.getText());
        this.setOptions(component);
        this.startHourSelect.set("value", component.journey.starts());
        this.endHourSelect.set("value", component.journey.ends());
    },

});