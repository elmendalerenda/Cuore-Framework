describe("SwitchCollapseAndUncollapseHandler", function () {
    
    it("inherits Handler", function () {
        var aSwitchCollapseHandler = new SwitchCollapseAndUncollapseHandler();

        expect(aSwitchCollapseHandler instanceof Handler).toBeTruthy();
        expect(aSwitchCollapseHandler instanceof SwitchCollapseAndUncollapseHandler).toBeTruthy();

    });

    it("should collapse and uncollapse", function () {
        aComponent = new Component();
        aComponent.status = true;

        aComponent.isCollapsed = function () {
            return aComponent.status;
        };

        aComponent.collapse = function () {
            aComponent.status = true;
        };

        aComponent.uncollapse = function () {
            aComponent.status = false;
        };

        var aSwitchCollapseHandler = new SwitchCollapseAndUncollapseHandler();
        aComponent.addHandler("testEvent", aSwitchCollapseHandler);

        aSwitchCollapseHandler.handle();
        expect(aComponent.isCollapsed()).toBeFalsy();

        aSwitchCollapseHandler.handle();
        expect(aComponent.isCollapsed()).toBeTruthy();

        aSwitchCollapseHandler.handle();
        expect(aComponent.isCollapsed()).toBeFalsy();;
    });

});