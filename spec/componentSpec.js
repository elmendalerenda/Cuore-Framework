describe("Component", function () {

    it("execution context initialization needs both service and procedure", function () {
        var aService = "IAmaService";
        var aProcedure = "IAmaProcedure";
        var defaultService = "NULL";
        var defaultProcedure = "nullProcedure";

        var aComponentWithBoth = new Component();
        aComponentWithBoth.initializeExecutionContext(aService, aProcedure);

        expect(aService).toEqual(aComponentWithBoth.service);
        expect(aProcedure).toEqual(aComponentWithBoth.procedure);

        var aComponentWithoutOne = new Component();
        aComponentWithBoth.initializeExecutionContext(aService);

        expect(aComponentWithoutOne.service).toEqual(defaultService);
        expect(aComponentWithoutOne.procedure).toEqual(defaultProcedure);

        var aComponentWithoutExecutionContext = new Component();

        expect(aComponentWithoutExecutionContext.procedure).toEqual(defaultProcedure);
        expect(aComponentWithoutExecutionContext.service).toEqual(defaultService);
    });

    it("could set a Renderer", function () {
        var aComponent = new Component();
        var aRenderer = {};
        aRenderer.render = function (component) {};

        spyOn(aRenderer, 'render');

        aComponent.setRenderer(aRenderer);

        aComponent.render();

        expect(aRenderer.render).toHaveBeenCalled();
    });

    it("adds handlers and could dispatch events to the handlers", function () {
        var aHandler = createDummyHandler();

        var event = "anEvent";
        var params = {
            aParam: "aparam",
            anotherParam: "anotherParam"
        };

        var aComponent = new Component();
        aComponent.addHandler(event, aHandler);

        aComponent.eventDispatch(event, params);

        expect(aHandler.recievedParams).toEqual(params);
        expect(aHandler.owner.getName()).toEqual(aComponent.getName());
    });

    it("can dispatch events even when it has no handlers", function () {
        var event = "anEvent";
        var params = {
            aParam: "aParam",
            anotherParam: "anotherParam"
        };

        var aComponent = new Component();
        aComponent.eventDispatch(event, params);
        expect(true).toBeTruthy();
    });


    it("knows events managed by handlers", function () {
        var event = "anEvent";
        var anotherEvent = "anotherEvent";
        var aComponent = new Component();

        aComponent.addHandler(event, createDummyHandler());
        aComponent.addHandler(event, createDummyHandler());

        var managedEvents = aComponent.getManagedEvents();
        expect(managedEvents).toEqual([event]);

        aComponent.addHandler(anotherEvent, createDummyHandler());

        var managedEvents = aComponent.getManagedEvents();
        expect(managedEvents).toEqual([event, anotherEvent]);
    });


    it("has a default name or could be explicitly named", function () {
        var aComponent = new Component("aService", "aProcedure");

        var componentDefaultName = "aComponent";
        expect(aComponent.getName()).toEqual(componentDefaultName);

        var testingName = "aTestName";
        aComponent.setName(testingName);
        expect(aComponent.getName()).toEqual(testingName);
    });


    it("provides its typename", function () {
        var aComponent = new Component();

        var expectedTypeName = "Component";
        expect(aComponent.getTypeName()).toEqual(expectedTypeName);

    });

    it("inject element into its container", function () {
        var container = createTestContainer();
        var componentName = "componentName";

        aComponent = new Component();
        aComponent.setName(componentName);
        aComponent.setContainer(container.get('id'));
        aComponent.draw();
        var id = aComponent.getUniqueID();

        expect(id).toEqual(componentName + "_inner");

        expect($defined($(id))).toBeDefined();
        expect($(id).get("tag")).toEqual("div");
        expect($(id).get("class")).toEqual("innerComponentDiv");
        expect($(id).getParent()).toEqual(container);
    });

    it("could be removed", function () {
        var container = createTestContainer();
        aComponent = new Component();
        aComponent.setContainer(container.get('id'));
        var id = aComponent.getUniqueID();

        aComponent.draw();

        expect($defined($(id))).toBeTruthy();

        aComponent.destroy();

        expect($defined($(id))).toBeFalsy();
    });



    it("allow adding css classes after drawing", function () {
        var container = createTestContainer();
        aComponent = new Component();
        aComponent.setContainer(container.get('id'));
        var componentId = aComponent.getUniqueID();

        aComponent.addClass("testingClass");
        aComponent.draw();

        expect($(componentId).hasClass("testingClass")).toBeTruthy();
        expect($(componentId).hasClass("innerComponentDiv")).toBeTruthy();

        aComponent.addClass("testingClass2");
        expect($(componentId).hasClass("testingClass2")).toBeTruthy();
        expect($(componentId).hasClass("testingClass")).toBeTruthy();
    });


    it("allow removing classes after drawing", function () {
        var container = createTestContainer();
        aComponent = new Component();
        aComponent.setContainer(container.get('id'));
        var componentId = aComponent.getUniqueID();

        aComponent.addClass("testingClass");
        aComponent.draw();

        expect($(componentId).hasClass("testingClass")).toBeTruthy();
        expect($(componentId).hasClass("innerComponentDiv")).toBeTruthy();

        aComponent.removeClass("testingClass");
        expect($(componentId).hasClass("testingClass")).toBeFalsy();
    });

    it("has I18NKey label getter & setter", function () {
        var aI18Nkey = "CanonicalKey";
        var aComponent = new Component();

        aComponent.setI18NKey(aI18Nkey);
        expect(aComponent.getI18NKey(aI18Nkey)).toEqual(aI18Nkey);
    });


    it("requests their label when it is drawn", function () {
        var aService = {};
        var receivedParams = undefined;
        aService.execute = function (procedure, params, flag) {
            receivedParams = params;
        };

        var container = createTestContainer();
        var calledService = null;

        aComponent = new Component();
        aComponent.setContainer(container.get('id'));

        document.page = {};
        document.page.getService = function (anyService) {
            calledService = anyService;
            return aService;
        };


        aComponent.setI18NKey("CanonicalKey");
        aComponent.draw();

        var expectedParams = {
            key: "CanonicalKey"
        };

        expect(receivedParams).toEqual(expectedParams);
        expect(calledService).toEqual(aComponent.LABELSERVICENAME);
    });

    it("has a Handler for its label when i18nkey setted", function () {
        var eventName = "LABELS_getLabel_EXECUTED_CanonicalKey";
        var aComponent = new Component();
        aComponent.setI18NKey("CanonicalKey");

        var events = aComponent.getManagedEvents();
        expect(events.contains(eventName)).toBeTruthy();
    });

    it("is suscribed to the bus on I18NKey set", function () {
        var receivedSubscriber = undefined;
        var receivedEvent = undefined;
        var bus = new Bus();
        bus.reset();
        var oldSubscribe = bus.subscribe;
        bus.subscribe = function (subscriber, event) {
            receivedSubscriber = subscriber;
            receivedEvent = event;
        };

        var eventName = "LABELS_getLabel_EXECUTED_CanonicalKey";
        var aComponent = new Component();
        aComponent.testFlag = true;
        aComponent.setI18NKey("CanonicalKey");

        expect(aComponent.testFlag).toEqual(receivedSubscriber.testFlag);
        expect(receivedEvent).toEqual(eventName);

        bus.subscribe = oldSubscribe;
    });


    it("does not request its label when drawn if it hasn't a I18Key", function () {
        var aService = {};
        var receivedParams = undefined;
        aService.execute = function (procedure, params, flag) {
            receivedParams = params;
        };

        var container = createTestContainer();
        var calledService = null;

        aComponent = new Component();
        aComponent.setContainer(container.get('id'));

        document.page = {};
        document.page.getService = function (anyService) {
            calledService = anyService;
            return aService;
        };

        aComponent.draw();

        expect(receivedParams).toBeUndefined();
        expect(calledService).toBeNull();

    });


    it("does not request its label when asked (getLabel) if it hasn't a I18Key", function () {
        var aService = {};
        var receivedParams = undefined;
        aService.execute = function (procedure, params, flag) {
            receivedParams = params;
        };

        var container = createTestContainer();
        var calledService = null;

        aComponent = new Component();
        aComponent.getLabelService = function () {
            return aService;
        };

        aComponent.getLabel();

        expect(receivedParams).toBeUndefined();
        expect(calledService).toBeNull();
    });


    it("can draw a text into the page", function () {
        var container = createTestContainer();

        var aComponent = new Component();
        aComponent.setContainer(container.get('id'));

        var testText = "testText";
        aComponent.setText(testText);
        aComponent.draw();
        var componentId = aComponent.getUniqueID();

        expect(aComponent.getText()).toEqual(testText);
        expect($(componentId).get("html")).toEqual(testText);

        var dummyText = "dummyTextIntoAPage";
        aComponent.setText(dummyText);
        expect($(componentId).get("html")).toEqual(dummyText);
    });


    it("fetch and execute a service from page and execute the procedure when it is executed", function () {

        var procedureName = "aProcedure";
        var serviceName = "aService";
        var testingParams = "testingParams";

        theService = preparePage(serviceName, procedureName);

        aComponent = new Component();
        aComponent.initializeExecutionContext(serviceName, procedureName);
        aComponent.execute();

        expect(document.page.expectedService).toEqual(serviceName);
        expect(theService.procedureExecuted).toEqual(procedureName);

        aComponent.execute(serviceName, procedureName, testingParams, false);
        expect(theService.paramsExecuted).toEqual(testingParams);

        aComponent.execute(serviceName, procedureName, testingParams, true);
        expect(theService.asynchronousReceived).toBeTruthy();
    });


    function preparePage(serviceName, procedureName) {
        document.page = {};

        var aService = prepareService();

        var expectedService = null;
        document.page.getService = function (theService) {
            document.page.expectedService = theService;
            return aService;
        };

        return aService;
    }

    function prepareService() {
        var aService = {};

        aService.paramsExecuted = null;
        aService.asynchronousReceived = false;
        aService.procedureExecuted = null;

        aService.execute = function (procedure, params, asynchronous) {
            this.procedureExecuted = procedure;
            this.paramsExecuted = params;
            this.asynchronousReceived = asynchronous;
        };

        return aService;
    }


    function createTestContainer() {
        $("xhtmlToTest").erase('html');
        var container = new Element('div', {
            "id": "testingContainer"
        }).inject($("xhtmlToTest"));
        return container;
    }

    function createDummyHandler() {
        var aHandler = {};
        aHandler.handle = function (params) {
            this.recievedParams = params;
        };
        aHandler.setOwner = function (owner) {
            this.owner = owner;
        };
        return aHandler;
    }

});