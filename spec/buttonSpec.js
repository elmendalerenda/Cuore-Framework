describe("Button", function () {
	
    it("inherits Component", function () {
        var aButton = new Button();

        expect(aButton instanceof Button).toBeTruthy();
        expect(aButton instanceof Component).toBeTruthy();
    });

    it("typename is 'Button'", function () {
        var aButton = new Button();

        expect(aButton.getTypeName()).toEqual("Button");
    });

    it("sets I18NKey in construct", function () {
        var aI18NKey = "CanonicalKey";
        var aButton = new Button("buttonName", aI18NKey);
        expect(aButton.getI18NKey()).toEqual(aI18NKey);
    });

    it("default text is 'Click!!'", function () {
        var container = createTestContainer();
        var aButton = new Button();
        aButton.setContainer(container.get("id"));
        expect(aButton.getText()).toEqual("CLICK!");

        aButton.draw();

        var DOMButton = $(aButton.getUniqueID());
        expect(DOMButton.get('text')).toEqual("CLICK!");
    });

    it("default name is 'aButton' and service is defaulted to 'BUTTON'", function () {
        var aButton = new Button();

        var calledProcedure = null;
        var aService = {};
        aService.execute = function (procedure, data) {
            calledProcedure = procedure;
        };
        var calledService = undefined;
        aButton.getService = function () {
            calledService = this.service;
            return aService;
        };

        aButton.click();
        expect(calledProcedure).toEqual("aButton");
        expect(calledService).toEqual("BUTTON");
    });

    it("generates an anchor in DOM with a span for css replacement when it is drawn", function () {
        var container = createTestContainer();

        var buttonName = "buttonName";
        var aButton = new Button(buttonName, "CanonicalKey");
        aButton.setContainer(container.get("id"));

        aButton.draw();

        var buttonText = "buttonText";
        aButton.setText(buttonText);

        var aDOMClass = "aCssClass";

        aButton.addClass(aDOMClass);

        var DOMButton = $(aButton.getUniqueID());

        expect(DOMButton.tagName).toEqual("A");
        expect(DOMButton.get('text')).toEqual(buttonText);

        var innerSpan = DOMButton.getElement('span');
        expect(innerSpan).toBeDefined();
        expect(innerSpan.get('text')).toEqual(buttonText);

        expect(DOMButton.hasClass(aDOMClass)).toBeTruthy();
    });

    it("has a click event that when it is fired calls button's service", function () {
        var container = createTestContainer();

        var buttonName = "buttonName";
        var aButton = new Button(buttonName, "CanonicalKey");
        aButton.setContainer(container.get("id"));

        aButton.draw();

        var DOMButton = $(aButton.getUniqueID());
        var events = new Hash(DOMButton.retrieve('events')).getKeys();

        expect(events.contains("click")).toBeTruthy();

        var dataToService = "testParams";
        var dataToServiceReceived = null;

        var serviceOnClick = {};
        serviceOnClick.executeCalled = false;

        serviceOnClick.execute = function (procedure, params) {
            serviceOnClick.executeCalled = true;
            dataToServiceReceived = params;
        };

        aButton.setData(dataToService);

        aButton.getService = function () {
            return serviceOnClick;
        };

        DOMButton.fireEvent("click");

        expect(serviceOnClick.executeCalled).toBeTruthy();
        expect(dataToServiceReceived).toEqual(dataToService);
    });

    xit("allows disabling and enabling behaviour", function () {
        var buttonName = "buttonName";
        var undrawnButton = new Button(buttonName, "CanonicalKey");

        expect(undrawnButton.isEnable()).toBeTruthy();
        undrawnButton.disable();
        expect(undrawnButton.isEnable()).toBeFalsy();
        undrawnButton.enable();
        expect(undrawnButton.isEnable()).toBeTruthy();
    });

    it("has enabled buttons that fire click event and disabled buttons that dont", function () {
        var container = createTestContainer();
        var buttonName = "buttonName";
        var aButton = new Button(buttonName, "CanonicalKey");

        var buttonClicked = false;

        aButton.click = function () {
            buttonClicked = true;
        };

        aButton.setContainer(container.get("id"));

        aButton.draw();

        var DOMButton = $(aButton.getUniqueID());

        aButton.disable();

        DOMButton.fireEvent('click');
        expect(buttonClicked).toBeFalsy();

        buttonClicked = false;

        aButton.enable();
        DOMButton.fireEvent('click');
        expect(buttonClicked).toBeTruthy();
    });

    it("has disabled buttons that have a CSS class", function () {
        var container = createTestContainer();
        var buttonName = "buttonName";
        var aButton = new Button(buttonName, "CanonicalKey");
        aButton.setContainer(container.get("id"));
        aButton.disable();
        aButton.draw();

        var DOMButton = $(aButton.getUniqueID());
        expect(DOMButton.hasClass("disabled")).toBeTruthy();

        aButton.enable();
        expect(DOMButton.hasClass("disabled")).toBeFalsy();
        aButton.disable();
        expect(DOMButton.hasClass("disabled")).toBeTruthy();
    });

    it("removes the button from the DOM when destroy method is called", function () {
        var container = createTestContainer();
        var buttonName = "buttonName";
        var aButton = new Button(buttonName, "CanonicalKey");
        aButton.setContainer(container.get("id"));

        aButton.draw();
        expect($(aButton.getUniqueID())).toBeTruthy();

        aButton.destroy();
        expect($(aButton.getUniqueID())).toBeFalsy();

    });

    it("requests a label when it is drawn", function () {
        var container = createTestContainer();
        var buttonName = "buttonName";
        var aButton = new Button(buttonName, "CanonicalKey");
        aButton.setContainer(container.get("id"));

        var getLabelCalled = false;

        aButton.getLabel = function () {
            getLabelCalled = true;
        };

        aButton.draw();

        expect(getLabelCalled).toBeTruthy();

    });

    function createTestContainer() {
        $("xhtmlToTest").erase('html');
        var container = new Element('div', {
            "id": "testingContainer"
        }).inject($("xhtmlToTest"));
        return container;
    }

});