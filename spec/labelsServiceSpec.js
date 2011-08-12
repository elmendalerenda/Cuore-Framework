describe("LabelsService", function () {
	
    it("inheris Service", function () {

        var aLabelService = new LabelsService();

        expect(aLabelService instanceof Service).toBeTruthy();
        expect(aLabelService instanceof LabelsService).toBeTruthy();
    });

    it("handles locale", function () {
        var aLabelService = new LabelsService();
        var browserLocale = (navigator.language || navigator.browserLanguage);
        var expectedLocale = "aLocale";
        
        expect(aLabelService.locale).toEqual(browserLocale);

        aLabelService.setLocale(expectedLocale);
        expect(aLabelService.locale).toEqual(expectedLocale);
    });

    it("calls request with correct eventName and params and baseURL when getLabel executed", function () {
        var labelService = new LabelsService();
        var browserLocale = (navigator.language || navigator.browserLanguage);
        var paramRequested = null;
        var eventNameRequested = null;
        var testEvent = "test_Event";
        var testKey = "testKey";
        var eventNameExpected = testEvent + labelService.SEPARATOR + testKey;
        var paramExpected = {
            "LABEL_KEY": testKey,
            "LOCALE": browserLocale
        };
        var baseURL = "http://baseurl/";
        var urlRequested = "";
        var expectedURL = baseURL + "labels/get";
        labelService.setBaseURL(baseURL);
        labelService.request = function (url, params, eventName) {
            urlRequested = url;
            paramRequested = params;
            eventNameRequested = eventName;
        };

        labelService.getLabel({
            "key": testKey
        }, testEvent);

        expect(eventNameRequested).toEqual(eventNameExpected);
        expect(paramRequested).toEqual(paramExpected);
        expect(urlRequested).toEqual(expectedURL);
    });

    it("uses an internal cache to save request calls", function () {
        var testEvent = "testEvent";
        var testKey = "testKey";
        var testParams = {
            "key": testKey
        };
        var expectedEmittedEvent = testEvent + "_" + testKey;
        var testLabel = "testLabel";
        var browserLocale = (navigator.language || navigator.browserLanguage);

        var labelService = new LabelsService();

        var emittedEvent = null;
        var emittedParams = null;
        var aBus = {};
        aBus.emit = function (eventName, params) {
            emittedEvent = eventName;
            emittedParams = params;
        };

        var requestCalled = false;
        labelService.getBus = function () {
            return aBus;
        };

        labelService.request = function (url, params, eventName) {
            requestCalled = true;
            var params = {
                "answer": testLabel
            };
            this.emit(eventName, params);
        };

        labelService.getLabel(testParams, testEvent);

        expect(requestCalled).toBeTruthy();
        expect(emittedEvent).toEqual(expectedEmittedEvent);

        var cacheExpected = {};
        cacheExpected[browserLocale] = {
            "testKey": "testLabel"
        };

        expect(labelService.cache).toEqual(cacheExpected);

        requestCalled = false;
        emittedEvent = null;
        emittedParams = null;
        labelService.getLabel(testParams, testEvent);

        expect(requestCalled).toBeFalsy();
        expect(emittedEvent).toEqual(expectedEmittedEvent);
    });

    it("reads document.labels as internal cache when initialized", function () {
        document.labels = undefined;

        var browserLocale = (navigator.language || navigator.browserLanguage);

        var service = new LabelsService();
        var expectedCache = {};
        expectedCache[browserLocale] = {};
        expect(service.cache).toEqual(expectedCache);

        document.labels = {};
        document.labels[browserLocale] = {
            "testKey": "testLabel"
        };

        var anotherService = new LabelsService();
        expect(anotherService.cache).toEqual(document.labels);
        document.labels = undefined;
    });

    it("can use (.) symbol in the name of the keys", function () {
        var testKey = "test.Key";
        var testLabel = "testLabel";
        var testParams = {
            "key": testKey
        };

        var labelService = new LabelsService();

        var aBus = {};
        aBus.emit = function (event, params) {};

        labelService.getBus = function () {
            return aBus;
        };

        labelService.request = function (url, params, eventName) {

            var params = {
                "answer": testLabel
            };
            this.emit(eventName, params);
        };

        labelService.getLabel(testParams, "testEvent");

        var browserLocale = (navigator.language || navigator.browserLanguage);

        cacheExpected = {};
        cacheExpected[browserLocale] = {
            "test.Key": "testLabel"
        };
        expect(labelService.cache).toEqual(cacheExpected);
        document.labels = undefined;
    });

    it("getLabel method calls with 404 requests returns key without caching", function () {
        aBus = {};
        aBus.answer = undefined;
        aBus.emit = function (event, params) {
            this.answer = params.answer;
        };

        var labelService = new LabelsService();
        labelService.getBus = function () {
            return aBus;
        };

        labelService.emit("testEvent_UnexistentKey", undefined);
        expect(aBus.answer).toEqual("UnexistentKey");
        var expectedCache = {};
        var browserLocale = (navigator.language || navigator.browserLanguage);
        expectedCache[browserLocale] = {};
        expect(labelService.cache).toEqual(expectedCache);
    });

    it("has a fail safe if documentLabels has bad cache", function () {
        document.labels = {};
        var testKey = "test.Key";
        var testLabel = "testLabel";
        var testParams = {
            "key": testKey
        };
        var labelInCache = false;

        var labelService = new LabelsService();

        aBus = {};
        aBus.emit = function (event, params) {};

        labelService.getBus = function () {
            return aBus;
        };

        labelService.request = function (url, params, eventName) {
            labelInCache = true;
        };

        labelService.getLabel(testParams, "testEvent");

        expect(labelInCache).toBeTruthy();
    });


    it("uses document.labels if cache is ok", function () {
        document.labels = {};
        var browserLocale = (navigator.language || navigator.browserLanguage);
        document.labels[browserLocale] = {
            "test.Key": "testLabel"
        };

        var testKey = "test.Key";
        var testLabel = "testLabel";
        var testParams = {
            "key": testKey
        };

        var labelInCache = true;

        var labelService = new LabelsService();

        aBus = {};
        aBus.emit = function (event, params) {};

        labelService.getBus = function () {
            return aBus;
        };

        labelService.request = function (url, params, eventName) {
            labelInCache = false;
        };

        labelService.getLabel(testParams, "testEvent");

        expect(labelInCache).toBeTruthy();
    });

});