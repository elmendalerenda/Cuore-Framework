describe("Journey", function () {

    it("defaults to a natural day", function () {
        aJourney = new Journey();
        expect(aJourney.starts()).toEqual("00:00");
        expect(aJourney.ends()).toEqual("24:00");
    });

    it("is created with a start and end hour", function () {
        aJourney = new Journey("00:10", "20:30");
        expect(aJourney.starts()).toEqual("00:10");
        expect(aJourney.ends()).toEqual("20:30");

        aJourney = new Journey("05:00");
        expect(aJourney.starts()).toEqual("00:00");;
        expect(aJourney.ends()).toEqual("24:00");
    });

    it("allows set start and end after initialization", function () {
        aJourney = new Journey("05:00", "10:00");
        aJourney.setStartTime("06:00");
        expect(aJourney.starts()).toEqual("06:00");
        aJourney.setStartTime("11:00");
        expect(aJourney.starts()).toEqual("09:00");

        aJourney = new Journey("05:00", "10:00");
        aJourney.setEndTime("09:00");
        expect(aJourney.ends()).toEqual("09:00");
        aJourney.setEndTime("00:00");
        expect(aJourney.ends()).toEqual("06:00");
    });

    it("is not valid when bad time format", function () {
        aJourney = new Journey("asdf", "asdf");
        expect(aJourney.starts()).toBeUndefined();
        expect(aJourney.ends()).toBeUndefined();
        expect(aJourney.isValid()).toBeFalsy();
    });

    it("handles valid hours and minutes starting with 0", function () {
        aJourney = new Journey("09:30", "10:02");
        expect(aJourney.starts()).toEqual("09:30");
        expect(aJourney.ends()).toEqual("10:02");
    });

    it("serializes to start hour and end hour", function () {
        aJourney = new Journey();
        expect(aJourney.toString()).toEqual("00:00-24:00");
        aJourney = new Journey("11:35", "21:23");
        expect(aJourney.toString()).toEqual("11:35-21:23");
    });

    it("has 24 slots with default values", function () {
        aJourney = new Journey();
        expect(aJourney.slots().length).toEqual(24);
    });

    it("has 24 slots with 00:01 as start and 24:00 as end last with only 59 minutes", function () {
        aJourney = new Journey("00:01", "24:00");
        expect(aJourney.slots().length).toEqual(24);
        finalSlot = aJourney.slots()[23];
        expect(finalSlot.starts()).toEqual("23:01");
        expect(finalSlot.ends()).toEqual("24:00");
    });

    it("has 24 slots with 00:59 as start and 24:00 as end", function () {
        aJourney = new Journey("00:59", "24:00");
        expect(aJourney.slots().length).toEqual(24);
        finalSlot = aJourney.slots()[23];
        expect(finalSlot.starts()).toEqual("23:59");
        expect(finalSlot.ends()).toEqual("24:00");
    });

    it("has 24 slots with 00:00 as start and 23:01 as end", function () {
        aJourney = new Journey("00:00", "23:01");
        expect(aJourney.slots().length).toEqual(24);
        finalSlot = aJourney.slots()[23];
        expect(finalSlot.starts()).toEqual("23:00");
        expect(finalSlot.ends()).toEqual("23:01");
    });

    it("has 24 slots with 00:00 as start and 23:59 as end", function () {
        aJourney = new Journey("00:00", "23:59");
        expect(aJourney.slots().length).toEqual(24);
        finalSlot = aJourney.slots()[23];
        expect(finalSlot.starts()).toEqual("23:00");
        expect(finalSlot.ends()).toEqual("23:59");
    });

    it("has a journey for each slot", function () {
        aJourney = new Journey();
        firstSlot = aJourney.slots()[0];
        aSlot = aJourney.slots()[5];
        anotherSlot = aJourney.slots()[18];
        lastSlot = aJourney.slots()[23];
        expect(firstSlot instanceof Journey).toBeTruthy();
        expect(aSlot instanceof Journey).toBeTruthy();
        expect(anotherSlot instanceof Journey).toBeTruthy();
        expect(lastSlot instanceof Journey).toBeTruthy();
    });

    it("has the correct start and end hours for each slot with default journey", function () {
        aJourney = new Journey("00:00", "24:00");
        firstSlot = aJourney.slots()[0];
        aSlot = aJourney.slots()[5];
        anotherSlot = aJourney.slots()[18];
        lastSlot = aJourney.slots()[23];
        expect(firstSlot.toString()).toEqual("00:00-01:00");
        expect(aSlot.toString()).toEqual("05:00-06:00");
        expect(anotherSlot.toString()).toEqual("18:00-19:00");
        expect(lastSlot.toString()).toEqual("23:00-24:00");
    });

    it("has a granularity of 60 minutes by default", function () {
        aJourney = new Journey();
        defaultGranularity = 60;
        expect(aJourney.granularity()).toEqual(defaultGranularity);
    });


    it("changes slots with a change of granularity", function () {
        aJourney = new Journey();
        aJourney.withGranularityOf(480);
        expect(aJourney.slots().length).toEqual(3);
    });


    it("has to round to a Integer the granularity", function () {
        aJourney = new Journey();
        aJourney.withGranularityOf(480.35);
        expect(aJourney.granularity()).toEqual(480);
    });
});