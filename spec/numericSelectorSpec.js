describe("Numeric Selector", function () {

    it("inherits Component and Input", function () {
        var aNumericSelector = getNumericSelector();

        expect(aNumericSelector instanceof NumericSelector).toBeTruthy();
        expect(aNumericSelector instanceof Component).toBeTruthy();
        expect(aNumericSelector instanceof Input).toBeTruthy();
    });

    it("could be drawn", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());

        children = DOMObject.getChildren("input");

        expect(children.length).toEqual(1);

        var inputElement = children[0];
        expect(inputElement.hasClass("numericSelector")).toBeTruthy();
        expect(inputElement.get("value")).toEqual(aNumericSelector.limInf + '');

        var events = new Hash(inputElement.retrieve('events')).getKeys();
        expect(events.contains("focus")).toBeTruthy();
        expect(events.contains("blur")).toBeTruthy();

    });

    it("has a button to increment", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());

        children = DOMObject.getChildren(".plusButton");
        expect(children.length).toEqual(1);
        var plusButton = children[0];
        expect(plusButton.get("tag")).toEqual("a");

        var events = new Hash(plusButton.retrieve('events')).getKeys();
        expect(events.contains("click")).toBeTruthy();
    });

    it("has a button to decrement", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());

        children = DOMObject.getChildren(".minusButton");
        expect(children.length).toEqual(1);
        var minusButton = children[0];
        expect(minusButton.get("tag")).toEqual("a");

        var events = new Hash(minusButton.retrieve('events')).getKeys();
        expect(events.contains("click")).toBeTruthy();
    });

    it("has the plusbutton on the right", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());

        children = DOMObject.getChildren("a");
        expect(children.length).toEqual(2);
        var minusButton = children[0];
        expect(minusButton.hasClass("minusButton")).toBeTruthy();
        var plusButton = children[1];
        expect(plusButton.hasClass("plusButton")).toBeTruthy();
    });

    it("allows to get and set its value", function () {
        var aNumericSelector = getNumericSelector();

        aNumericSelector.setValue(2);
        expect(aNumericSelector.getValue()).toEqual(2);

        aNumericSelector.setValue("");
        expect(aNumericSelector.getValue()).toEqual(0);

        aNumericSelector.setValue(3);
        aNumericSelector.draw();
        expect(aNumericSelector.getValue()).toEqual('3');
    });

    it("could have upper and lower limit", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();
        aNumericSelector.setValue(2);

        aNumericSelector.setLimSup(3);
        aNumericSelector.setValue(4);

        expect(aNumericSelector.getValue()).toEqual('3');
        expect(aNumericSelector.getLimSup()).toEqual(3);

        aNumericSelector.setLimInf(2);
        aNumericSelector.setValue(0);

        expect(aNumericSelector.getValue()).toEqual('2');
        expect(aNumericSelector.getLimInf()).toEqual(2);
    });

    it("could have negative limits", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();
        aNumericSelector.setValue(0);

        aNumericSelector.setLimSup(1);
        aNumericSelector.setValue(2);

        expect(aNumericSelector.getValue()).toEqual('1');

        aNumericSelector.setLimInf(-1);
        aNumericSelector.setValue(-2);
        expect(aNumericSelector.getValue()).toEqual('-1');

        aNumericSelector.setValue(0);
        expect(aNumericSelector.getValue()).toEqual('0');
    });

    it("clears value when focus and keeps old value when blur", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());

        var theInput = DOMObject.getFirst("input");

        theInput.fireEvent('focus');
        expect(theInput.get("value")).toEqual("");
        theInput.fireEvent('blur');

        theInput.fireEvent('focus');
        theInput.set("value", 2);
        theInput.fireEvent('blur');
        expect(aNumericSelector.getValue()).toEqual('2');

        theInput.fireEvent('focus');
        theInput.set("value", "");
        theInput.fireEvent('blur');
        expect(aNumericSelector.getValue()).toEqual('2');

        theInput.fireEvent('focus');
        theInput.set("value", "we34");
        theInput.fireEvent('blur');
        expect(aNumericSelector.getValue()).toEqual('2');

        theInput.fireEvent('focus');
        theInput.set("value", "2.5");
        theInput.fireEvent('blur');
        expect(aNumericSelector.getValue()).toEqual('2');
    });

    it("has increment and decrement buttons that could be clicked", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());

        var value = aNumericSelector.getValue();
        var incrementer = 4;
        aNumericSelector.setIncrementer(incrementer);
        var plusButton = DOMObject.getFirst(".plusButton");
        plusButton.fireEvent('click');
        var expected = (parseInt(value) + incrementer).toString();

        expect(aNumericSelector.getValue()).toEqual(expected);

        var value = aNumericSelector.getValue();
        var minusButton = DOMObject.getFirst(".minusButton");
        var incrementer = 2;
        aNumericSelector.setIncrementer(incrementer);
        minusButton.fireEvent('click');
        expected = (value - incrementer).toString();

        expect(aNumericSelector.getValue()).toEqual(expected);
    });

    it("emits event when the value is changed", function () {
        var bus = {};

        var numericSelectorEvent = "";
        var numericSelectorParams = undefined;

        bus.emit = function (event, params) {
            numericSelectorEvent = event;
            numericSelectorParams = params;
        };

        var aNumericSelector = getNumericSelector();
        aNumericSelector.getBus = function () {
            return bus;
        };

        aNumericSelector.draw();
        var expectedValue = 3;
        aNumericSelector.setValue(expectedValue);

        var expectedParams = {
            "value": expectedValue
        };
        var expectedEvent = "COMPONENT_" + aNumericSelector.name + "_CHANGED";

        expect(expectedParams).toEqual(numericSelectorParams);
        expect(expectedEvent).toEqual(numericSelectorEvent);
    });

    it("allows to decorate the buttons ", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();

        var DOMObject = $(aNumericSelector.getUniqueID());
        var plusButton = DOMObject.getFirst(".plusButton");
        aNumericSelector.setLimSup(3);

        aNumericSelector.setValue(3);
        expect(plusButton.hasClass("off")).toBeTruthy();

        aNumericSelector.setValue(2);
        expect(plusButton.hasClass("off")).toBeFalsy();

        var minusButton = DOMObject.getFirst(".minusButton");
        aNumericSelector.setLimInf(0);

        aNumericSelector.setValue(0);
        expect(minusButton.hasClass("off")).toBeTruthy();

        aNumericSelector.setValue(2);
        expect(minusButton.hasClass("off")).toBeFalsy();
    });

    it("change buttons decoration when limits are reached", function () {
        var aNumericSelector = getNumericSelector();
        aNumericSelector.draw();
        aNumericSelector.setIncrementer(2);

        var DOMObject = $(aNumericSelector.getUniqueID());
        var plusButton = DOMObject.getFirst(".plusButton");
        aNumericSelector.setLimSup(3);
        aNumericSelector.setValue(2);
        expect(plusButton.hasClass("off")).toBeTruthy();

        aNumericSelector.setValue(0);
        expect(plusButton.hasClass("off")).toBeFalsy();

        var minusButton = DOMObject.getFirst(".minusButton");
        aNumericSelector.setLimInf(-3);

        aNumericSelector.setValue(-2);
        expect(minusButton.hasClass("off")).toBeTruthy();

        aNumericSelector.setValue(0);
        expect(minusButton.hasClass("off")).toBeFalsy();
        aNumericSelector.setValue(3);
        expect(aNumericSelector.getValue()).toEqual('2');
        aNumericSelector.setValue(-3);
        expect(aNumericSelector.getValue()).toEqual('-2');
    });

    function getNumericSelector() {
        $("xhtmlToTest").erase("html");
        var aNumericSelector = new NumericSelector();
        aNumericSelector.setContainer("xhtmlToTest");
        return aNumericSelector;
    }
});