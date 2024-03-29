describe("PrintHandler", function () {
	
    it("inherits Handlet", function () {
        var theHandler = new PrintHandler();

        expect(theHandler instanceof PrintHandler).toBeTruthy();
        expect(theHandler instanceof Handler).toBeTruthy();
    });

    it("executes window.print", function () {
        var originalPrint = window.print;

        var printCalled = false;
        window.print = function () {
            printCalled = true;
        };

        var theHandler = new PrintHandler();

        theHandler.handle();

        expect(printCalled).toBeTruthy();

        window.print = originalPrint;
    });

});