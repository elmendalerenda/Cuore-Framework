describe("SwitchButton", function () {
	
    it("inherits Component and Button", function () {

        var keyActive = "testKeyActive";
        var keyInactive = "testKeyInactive";
        var aButton = new SwitchButton("buttonName", keyActive, keyInactive);

        expect(aButton instanceof SwitchButton).toBeTruthy();
        expect(aButton instanceof Button).toBeTruthy();
        expect(aButton instanceof Component).toBeTruthy();

    });

    it("should return 'SwitchButton' as typename", function () {
        var keyActive = "testKeyActive";
        var keyInactive = "testKeyInactive";
        var aButton = new SwitchButton("buttonName", keyActive, keyInactive);

        expect(aButton.getTypeName()).toEqual("SwitchButton");
    });

    it("should have default labels", function () {
        var aButton = new SwitchButton();
        expect(aButton.getActiveLabel()).toEqual("CLICK!");
        expect(aButton.getInactiveLabel()).toEqual("CLICK!");
    });

    it("should ignore undefined keys when getLabel called", function () {
        var aButton = new SwitchButton();
        var calledGetLabelService = false;
        aButton.getLabelService = function () {
            calledGetLabelService = true;
        };
        aButton.getLabel(null);
        aButton.getLabel(undefined);
        expect(calledGetLabelService).toBeFalsy();
    });

    it("should request active and inactive key when drawn", function () {

        var container = createTestContainer();
        var keyActive = "testKeyActive";
        var keyInactive = "testKeyInactive";
        var aButton = new SwitchButton("buttonName", keyActive, keyInactive);
        aButton.setContainer(container.get("id"));

        var labelsRequested = [];
        aButton.getLabel = function (aLabel) {
            labelsRequested.push(aLabel);
        };

        aButton.draw();

        expect("SwitchButton").toEqual(aButton.getTypeName());
        expect(aButton.getActiveKey()).toEqual(keyActive);
        expect(aButton.getInactiveKey()).toEqual(keyInactive);

        expect(labelsRequested.contains(keyActive)).toBeTruthy();
        expect(labelsRequested.contains(keyInactive)).toBeTruthy();

    });

    it("should switches state, label and cssclass when clicked", function () {
        var container = createTestContainer();
        var aButton = new SwitchButton("buttonName", "testKeyActive", "testKeyInactive");
        aButton.setContainer(container.get("id"));

        var activeLabel = "active";
        var inactiveLabel = "inactive";
        var activeMessage = new Message();
	activeMessage.putOnAnswer("text",activeLabel);
	
        var inactiveMessage = new Message();
	inactiveMessage.putOnAnswer("text",inactiveLabel);

        aButton.setActiveLabel(activeMessage);
        aButton.setInactiveLabel(inactiveMessage);

        expect(aButton.isActive()).toBeTruthy();

        aButton.draw();

        var DOMButton = $(aButton.getUniqueID());

        expect(aButton.isActive()).toBeTruthy();
        expect(DOMButton.hasClass("on")).toBeTruthy();
        expect(DOMButton.hasClass("off")).toBeFalsy();

        expect(DOMButton.get("text")).toEqual(activeLabel);

        aButton.click();

        expect(aButton.isActive()).toBeFalsy();
        expect(DOMButton.hasClass("off")).toBeTruthy();
        expect(DOMButton.hasClass("on")).toBeFalsy();

        expect(DOMButton.get("text")).toEqual(inactiveLabel);
    });

    it("should emit event when clicked", function () {
        var aButton = new SwitchButton("buttonName", "testKeyActive", "testKeyInactive");

        var aService = {};
        aService.execute = function() {};
        spyOn(aService, 'execute');

        aButton.getService = function () {
            return aService;
        };

        aButton.click();

        expect(aService.execute).toHaveBeenCalled();

        aService.execute.reset();

        aButton.click(false);

        expect(aService.execute).not.toHaveBeenCalled();
    });

    it("should get labelHandler when initialized", function () {
        var activeKeyEvent = "LABELS_getLabel_EXECUTED_activeKey";
        var inactiveKeyEvent = "LABELS_getLabel_EXECUTED_inactiveKey";

        var aButton = new SwitchButton("ButtonName", "activeKey", "inactiveKey");

        var events = aButton.getManagedEvents();

        expect(events.contains(activeKeyEvent)).toBeTruthy();
        expect(events.contains(inactiveKeyEvent)).toBeTruthy();

    });

    function createTestContainer() {
        $("xhtmlToTest").erase('html');
        var container = new Element('div', {
            "id": "testingContainer"
        }).inject($("xhtmlToTest"));
        return container;
    }

});