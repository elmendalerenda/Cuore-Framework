describe("Collapsable Panel", function () {

    it("inherits Component", function () {

        var aPanel = new CollapsablePanel();

        expect(aPanel instanceof CollapsablePanel).toBeTruthy();
        expect(aPanel instanceof Component).toBeTruthy();
    });

    it("typename is 'CollapsablePanel'", function () {

        var aPanel = new CollapsablePanel();
        expect(aPanel.getTypeName()).toEqual("CollapsablePanel");
    });

    it("can be draw in a container", function () {
        var container = createTestContainer();

        var aPanel = new CollapsablePanel();
        aPanel.setContainer(container.get("id"));

        aPanel.draw();

        var DOMPanel = $(aPanel.getUniqueID());

        expect(DOMPanel).toBeTruthy();
        expect(DOMPanel.get("tag")).toEqual("div");

        expect(DOMPanel.hasClass("collapsablePanel")).toBeTruthy();
        expect(DOMPanel.hasClass("collapsed")).toBeTruthy();

    });

    it("change css class when collapse", function () {
        var container = createTestContainer();

        var aPanel = new CollapsablePanel();
        aPanel.setContainer(container.get("id"));

        expect(aPanel.isCollapsed()).toBeTruthy();
        aPanel.uncollapse();
        expect(aPanel.isCollapsed()).toBeFalsy();

        aPanel.draw();
        var DOMPanel = $(aPanel.getUniqueID());

        expect(DOMPanel.hasClass("uncollapsed")).toBeTruthy();
        expect(DOMPanel.hasClass("collapsed")).toBeFalsy();

        aPanel.collapse();
        expect(aPanel.isCollapsed()).toBeTruthy();
        expect(DOMPanel.hasClass("collapsed")).toBeTruthy();
        expect(DOMPanel.hasClass("uncollapsed")).toBeFalsy();

    });

    it("has height 0 when collapsed but has some height when not", function () {
        var numberOfAssertionsInText = 2;
        expect(numberOfAssertionsInText);

        var container = createTestContainer();

        var aPanel = new CollapsablePanel();
        aPanel.uncollapse();

        aPanel.setContainer(container.get("id"));

        aPanel.setText("dummyText");
        aPanel.draw();

        aPanel.collapse();

        var DOMPanel = $(aPanel.getUniqueID());

        expect(DOMPanel.getStyle("height")).toEqual("0px");

        aPanel.uncollapse();

        expect(DOMPanel.getStyle("height")).toNotEqual("0px");
    });

    function createTestContainer() {
        $("xhtmlToTest").erase('html');
        var container = new Element('div', {
            "id": "testingContainer"
        }).inject($("xhtmlToTest"));
        return container;
    }
});