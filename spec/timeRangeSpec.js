describe("TimeRange", function () {

    it("inherits Component", function () {
        var theComponent = getTimeRange();
        expect(theComponent instanceof Component).toBeTruthy();
        expect(theComponent instanceof TimeRange).toBeTruthy();
    });

    it("should have a type name", function () {
        var theComponent = getTimeRange();
        expect(theComponent.getTypeName()).toEqual("TimeRange");
    });

    it("could be Instanced with I18N", function () {
        var theComponent = new TimeRange("aKey");
        expect(theComponent.getI18NKey()).toEqual("aKey");
    });

    it("should draw selects", function () {
        var theComponent = getTimeRange();
        var aText = "aText";
        theComponent.setText("anotherText");
        theComponent.draw();
        theComponent.setText(aText);
        DOMObject = $(theComponent.getUniqueID());
        expect(DOMObject.get("text").indexOf("anotherText")).toEqual(-1);
        expect(DOMObject.hasClass("timeRange")).toBeTruthy();

        var label = DOMObject.getFirst("label");
        expect($defined(label)).toBeTruthy();
        expect(label.get("text")).toEqual(aText);

        var startHourSelect = DOMObject.getFirst("select.startHourSelect");
        expect($defined(startHourSelect)).toBeTruthy();

        var endHourSelect = DOMObject.getFirst("select.endHourSelect");
        expect($defined(endHourSelect)).toBeTruthy();
    });

    it("should draw default values", function () {
        var theComponent = getTimeRange();
        theComponent.draw();
        DOMObject = $(theComponent.getUniqueID());

        var startSelectOptions = DOMObject.getFirst("select.startHourSelect").getChildren("option");
        expect(startSelectOptions[0].getProperty("value")).toEqual("00:00");
        expect(startSelectOptions[0].getProperty("text")).toEqual("00:00");
        expect(startSelectOptions[23].getProperty("value")).toEqual("23:00");
        expect(startSelectOptions[23].getProperty("text")).toEqual("23:00");
        expect(startSelectOptions.length, 24, "Amount of options");
        var selectedOption = DOMObject.getFirst("select.startHourSelect").getSelected();
        var selectedHour = selectedOption[0].get('value');
        expect(selectedHour).toEqual("00:00");

        var endSelectOptions = DOMObject.getFirst("select.endHourSelect").getChildren("option");
        expect(endSelectOptions[0].getProperty("value")).toEqual("01:00");
        expect(endSelectOptions[0].getProperty("text")).toEqual("01:00");
        expect(endSelectOptions[23].getProperty("value")).toEqual("24:00");
        expect(endSelectOptions[23].getProperty("text")).toEqual("24:00");
        expect(endSelectOptions.length, 24, "Amount of options");
        var selectedOption = DOMObject.getFirst("select.endHourSelect").getSelected();
        var selectedHour = selectedOption[0].get('value');
        expect(selectedHour).toEqual("24:00");
    });

    it("should draw end options depending on start hour", function () {
        var theComponent = getTimeRange();
        theComponent.draw();
        DOMObject = $(theComponent.getUniqueID());
        var endHour = "07:00";
        theComponent.setEndHour(endHour);

        var startHour = "03:00";
        theComponent.setStartHour(startHour);

        var options = DOMObject.getFirst("select.endHourSelect").getChildren("option");
        expect(options[0].getProperty("value")).toEqual("04:00");

        var selectedOption = DOMObject.getFirst("select.startHourSelect").getSelected();
        var selectedHour = selectedOption[0].get('value');
        expect(selectedHour).toEqual(startHour);
        selectedOption = DOMObject.getFirst("select.endHourSelect").getSelected();
        selectedHour = selectedOption[0].get('value');
        expect(selectedHour).toEqual(endHour);
    });

    it("should draw start options depending on end hour", function () {
        var theComponent = getTimeRange();
        theComponent.draw();
        var DOMObject = $(theComponent.getUniqueID());
        var startHour = "04:00";
        theComponent.setStartHour(startHour);

        var endHour = "20:00";
        theComponent.setEndHour(endHour);

        var options = DOMObject.getFirst("select.startHourSelect").getChildren("option");
        var lastOption = (options.length - 1);
        expect(options[lastOption].getProperty("value")).toEqual("19:00");

        var selectedOption = DOMObject.getFirst("select.endHourSelect").getSelected();
        var selectedHour = selectedOption[0].get('value');
        expect(selectedHour).toEqual(endHour);
        selectedOption = DOMObject.getFirst("select.startHourSelect").getSelected();
        selectedHour = selectedOption[0].get('value');
        expect(selectedHour).toEqual(startHour);
    });

    it("should draw select options depending each other", function () {
        var theComponent = getTimeRange();
        theComponent.draw();
        var DOMObject = $(theComponent.getUniqueID());

        var startSelect = DOMObject.getFirst("select.startHourSelect");
        var endSelect = DOMObject.getFirst("select.endHourSelect");
        var mockedEvent={};
        mockedEvent.target=function(){};
        
        var expectedValue = "09:00";
        startSelect.set("value", expectedValue);
        startSelect.fireEvent("change",mockedEvent);
        expect(theComponent.getStartHour()).toEqual("09:00");
        var expectedValue = "12:00";
        endSelect.set("value", expectedValue);
        endSelect.fireEvent("change",mockedEvent);
        expect(theComponent.getEndHour()).toEqual(expectedValue);
    });

    
    
    it("should call service on change", function () {
        var theComponent = getTimeRange();

        var emitedEvent = null;
        var emitedParams = null;

        var bus = {};
        bus.emit = function (event, params) {
            emitedEvent = event;
            emitedParams = params;
        };

        theComponent.getBus = function () {
            return bus;
        };

        var expectedValue = "03:00";
        theComponent.setStartHour(expectedValue);

        var expectedParams = {
            "startHour": "03:00",
            "endHour": "24:00"
        };
        var expectedEvent = "COMPONENT_" + theComponent.name + "_CHANGED";

        expect(expectedParams).toEqual(emitedParams);
        expect(expectedEvent).toEqual(emitedEvent);

        var expectedValue = "08:00";
        theComponent.setEndHour(expectedValue);

        var expectedParams = {
            "startHour": "03:00",
            "endHour": "08:00"
        };
        var expectedEvent = "COMPONENT_" + theComponent.name + "_CHANGED";

        expect(expectedParams).toEqual(emitedParams);
        expect(expectedEvent).toEqual(emitedEvent);
    });

    it("should allow to set and get the values", function () {
        var theComponent = getTimeRange();

        theComponent.setStartHour("4:00");
        expect(theComponent.getStartHour()).toEqual("04:00");

        theComponent.setEndHour(8);
        expect(theComponent.getEndHour()).toEqual("08:00");

        theComponent.setStartHour(1);
        theComponent.setEndHour(3);
        theComponent.setStartHour(4);
        expect(theComponent.getStartHour()).toEqual("02:00");

        theComponent.setEndHour(7);
        theComponent.setStartHour(4);
        theComponent.setEndHour(3);
        expect(theComponent.getEndHour()).toEqual("05:00");
    });

    it("should allow to specify granularity in 15 minutes or 30 minutes ", function () {
        var theComponent = getTimeRange(15);
        theComponent.draw();
        DOMObject = $(theComponent.getUniqueID());

        var startSelectOptions = DOMObject.getFirst("select.startHourSelect").getChildren("option");
        expect(startSelectOptions[1].getProperty("text")).toEqual("00:15");
        expect(startSelectOptions[4].getProperty("text")).toEqual("01:00");
    });

    function getTimeRange(granularity) {
        $("xhtmlToTest").erase("html");
        var key = "aKey";
        var aComponent = new TimeRange(key);
        if ($defined(granularity)) {
            var aComponent = new TimeRange(key, granularity);
        }
        aComponent.setContainer("xhtmlToTest");
        return aComponent;
    }

});