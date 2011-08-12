describe("ExecutorHandler", function () {

    it("inherits Handler", function () {
        var aHandler = new ExecutorHandler();

        expect(aHandler instanceof ExecutorHandler).toBeTruthy();
        expect(aHandler instanceof Handler).toBeTruthy();
    });

    it("sets an owner function when it is initialized", function () {

        var aFunction = "testFunction";
        var aHandler = new ExecutorHandler(aFunction);

        expect(aHandler.ownerFunction).toEqual(aFunction);
    });

    it("handle method calls a owner's method", function () {
        var aFunction = "testFunction";
        var aParams = "testParams";
        var aComponent = {
            testFunction: function(params) {
                this.paramsCalled = params;
            }
        };

        var aHandler = new ExecutorHandler(aFunction);
        aHandler.setOwner(aComponent);
        aHandler.handle(aParams);

        expect(aComponent.paramsCalled).toEqual(aParams);
    });

});