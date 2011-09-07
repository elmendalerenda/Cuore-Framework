describe("Input", function () {
	
    it("inherits Component", function () {
        var theComponent = getComponentInput();
        expect(theComponent instanceof Input).toBeTruthy();
        expect(theComponent instanceof Component).toBeTruthy();
    });

    it("is drawn in a container", function () {
        var aService = {};
        aService.execute = function (procedure, params, asynchronous) {};

        var theComponent = getComponentInput();
        theComponent.getLabelService = function () {
            return aService;
        };

        theComponent.draw();

        DOMObject = $(theComponent.getUniqueID());


        expect(DOMObject.hasClass("inputJS")).toBeTruthy();

        children = DOMObject.getChildren("input");
        expect(children.length).toEqual(1);
        children = DOMObject.getChildren("label");
        expect(children.length).toEqual(1);
    });

    it("allows to get its value", function () {
        var aComponent = getComponentInput();
        aComponent.draw();

        DOMObject = $(aComponent.getUniqueID());
        DOMObject.getFirst("input").value = "testText";

        expect(aComponent.getValue()).toEqual("testText");
    });

    it("allows to set a value", function () {
        var aComponent = getComponentInput();
        aComponent.draw();

        aComponent.setValue("testText");

        DOMObject = $(aComponent.getUniqueID());
        var value = DOMObject.getFirst("input").value;
        expect(value).toEqual("testText");
    });

    it("allows no be enabled or disable", function () {
        var aComponent = getComponentInput();
        aComponent.draw();
        DOMInput = $(aComponent.getUniqueID()).getFirst("input");

        expect(DOMInput.get("disabled")).toBeFalsy();

        aComponent.disable();
        expect(DOMInput.get("disabled")).toBeTruthy();

        aComponent.enable();
        expect(DOMInput.get("disabled")).toBeFalsy();
    });

    it("allows changing the type", function () {
        var aComponent = getComponentInput();
        aComponent.draw();

        DOMInput = $(aComponent.getUniqueID()).getFirst("input");
        expect(DOMInput.get("type")).toEqual("text");

        $("xhtmlToTest").erase("html");
        aComponent = new Input(undefined, "password");
        aComponent.setContainer("xhtmlToTest");
        aComponent.draw();
        DOMInput = $(aComponent.getUniqueID()).getFirst("input");
        expect(DOMInput.get("type")).toEqual("password");
        $("xhtmlToTest").erase("html");
    });

    it("allows set the text without drawing previously", function () {
        var aComponent = getComponentInput();
        aComponent.setText("testText");
        aComponent.draw();
        DOMObject = $(aComponent.getUniqueID());
        var value = DOMObject.getFirst("label").get("html");
        expect(value).toEqual("testText");
    });

    it("must clean its text when drawn by parent", function () {
        var aComponent = getComponentInput();
        aComponent.setText("testText");
        aComponent.draw();
        DOMObject = $(aComponent.getUniqueID());
        var value = DOMObject.get("text");
        expect(value).toEqual("testText");
    });

    it("must update its text when drawn", function () {
        var aComponent = getComponentInput();
        aComponent.draw();
        aComponent.setText("testText");
        DOMObject = $(aComponent.getUniqueID());
        var value = DOMObject.get("text");
        expect(value).toEqual("testText");
    });
    
    function getComponentInput() {
        $("xhtmlToTest").erase("html");
        var aComponent = new Input("CanonicalKey");
        aComponent.setContainer("xhtmlToTest");
        return aComponent;
    }
});