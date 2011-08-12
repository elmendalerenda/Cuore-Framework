describe("Service", function () {

    it("calls procedure and bus emits the event when service is executed", function () {
        var aService = new Service();
        aService = addTestProcedure(aService);
        var bus = createDummyBus();
        aService.getBus = function () {
            return bus;
        };

        var procedureName = "testProcedure";
        var params = {
            "testParam1": true,
            "testParam2": true
        };

        aService.execute(procedureName, params);

        expect(aService.testProcedureExecuted).toBeTruthy();
        expect(aService.testProcedureParams).toEqual(params);
        expect(aService.getBus().broadcastEvent).toEqual(aService.getEventNameForExecution(procedureName));
    });

    it("calls procedure and bus emits the event when Service executes a procedure synchronously", function () {
        var aService = new Service();
        aService = addTestProcedure(aService);
        var bus = createDummyBus();
        aService.getBus = function () {
            return bus;
        };

        var procedureName = "testProcedure";
        var params = {
            "testParam1": true,
            "testParam2": true
        };

        aService.execute(procedureName, params, false);

        expect(aService.testProcedureExecuted).toBeTruthy();
        expect(aService.testProcedureParams).toEqual(params);
        expect(aService.getBus().broadcastEvent).toEqual(aService.getEventNameForExecution(procedureName));
    });

    it("calls procedure asynchronously but bus cannot emit yet when service is executed asynchronously", function () {
        var aService = new Service();
        aService = addTestProcedure(aService);
        var bus = createDummyBus();
        aService.getBus = function () {
            return bus;
        };

        var procedureName = "testProcedure";
        var params = {
            "testParam1": true,
            "testParam2": true
        };

        aService.execute(procedureName, params, true);

        expect(aService.testProcedureExecuted).toBeTruthy();
        expect(aService.testProcedureParams).toEqual(params);
        expect(aService.getBus().broadcastEvent).toBeUndefined();
    });

    it("has a BaseURL defaulted to empty string", function () {
        var aService = new Service();
        expect(aService.getBaseURL()).toEqual('');

        var aBaseURL = "a Base URL";
        aService.setBaseURL(aBaseURL);
        expect(aService.getBaseURL()).toEqual(aBaseURL);
    });

    it("stores the last data sent when a request is done", function () {
        var aService = new Service();

        expect(aService.getLastDataSent()).toBeNull();

        var params = {
            "param1": "lol"
        };

        aService.request("http://localhost", params);

        expect(aService.getLastDataSent()).toEqual(params);
    });

    it("executes a procedure asynchronously and bus emits the event when request completes", function () {
        var aService = new Service();
        var procedureName = "testProcedure";

        aService.testProcedure = function (params, eventName) {
            this.request("http://localhost", params, eventName);
        };

        var bus = createDummyBus();
        aService.getBus = function () {
            return bus;
        };

        var executedEvent = aService.getEventNameForExecution(procedureName);
        aService.getBus().emit = function (event, params) {
            this.broadcastEvent = event;
            expect(this.broadcastEvent).toEqual(executedEvent);
        };

        aService.execute(procedureName, {}, true);
    });

    it("builds a unique name for every event sent", function () {
        var aService = new Service();

        var procedureName = "procedureTest";
        var SEPARATOR = "_";
        var expectedName = aService.getName() + SEPARATOR + procedureName + SEPARATOR + aService.executionPrefix;

        expect(aService.getEventNameForExecution(procedureName)).toEqual(expectedName);
    });

    var addTestProcedure = function(aService) {
	    aService.testProcedureExecuted = false;
	    aService.testProcedureParams = null;
	    
	    aService.testProcedure = function(procedureParams) {
		    aService.testProcedureExecuted = true;
		    aService.testProcedureParams   = procedureParams;
	    };
	
	    return aService;
    };
 
    var createDummyBus = function() {
        var aBus = {};
        aBus.broadcastEvent = undefined;

        aBus.emit = function (event, params) {
            this.broadcastEvent = event;
        };

        return aBus;
    };

});