describe("NestableComponent", function () {

    it("is a Component", function () {
        var aComponent = new NestableComponent();
        expect(aComponent instanceof Component).toBeTruthy();
    });

    it("can host any Component", function () {
        var anyComponent = new Component();
        var aComponent = new NestableComponent();

        aComponent.host(anyComponent);

        expect(aComponent.hosted()).toContain(anyComponent);
    });

    it("knows events managed by nested Components", function () {
        var anyComponent = new Component();
        var aHandler = {};
        aHandler.setOwner = function () {};
        anyComponent.addHandler("anEvent", aHandler);
        anyComponent.addHandler("sameEvent", aHandler);

        var aComponent = new NestableComponent();
        aComponent.addHandler("anotherEvent", aHandler);
        aComponent.addHandler("sameEvent", aHandler);

        aComponent.host(anyComponent);

        expect(aComponent.getManagedEvents()).toContain("anEvent");
        expect(aComponent.getManagedEvents()).toContain("anotherEvent");
        expect(aComponent.getManagedEvents()).toContain("sameEvent");

    });

    it("dispatch  events to nestedComponents", function () {
        var anyComponent = new Component();

        spyOn(anyComponent, "eventDispatch");

        var aComponent = new NestableComponent();
        //console.log(aComponent);

        aComponent.host(anyComponent);
        aComponent.eventDispatch("anEvent", undefined);

        expect(anyComponent.eventDispatch).toHaveBeenCalledWith("anEvent", undefined);
    });

    it("draws nested components inside nesting components", function () {
        var anyComponent = new Component();
        spyOn(anyComponent, "draw");
        var aComponent = new NestableComponent();
        var container = createTestContainer();
        aComponent.setContainer(container.get('id'));
        aComponent.host(anyComponent);

        aComponent.draw();

        expect(anyComponent.draw).toHaveBeenCalled();
    });

    it("draws nested components inside parent panel", function () {
        var anyComponent = new Component();
        var aComponent = new NestableComponent();
        var container = createTestContainer();
        aComponent.setContainer(container.get('id'));
        aComponent.host(anyComponent);

        aComponent.draw();

        var aComponentDOMElement = $(aComponent.getUniqueID());
        var firstChildId = aComponentDOMElement.getChildren()[0].get('id');
        expect(firstChildId).toEqual(anyComponent.getUniqueID());
    });
    
    it("should not replace hosted components with its text, when updating drawn component", function () {
        var anyComponent = new Component();
        var aComponent = new NestableComponent();
        var container = createTestContainer();
        aComponent.setContainer(container.get('id'));
        aComponent.host(anyComponent);

        aComponent.draw();
        aComponent.draw();

        var aComponentDOMElement = $(aComponent.getUniqueID());
        var firstChildId = aComponentDOMElement.getChildren()[0].get('id');
        expect(firstChildId).toEqual(anyComponent.getUniqueID());
    });


    it("assigns different identifiers to nested components", function () {
        var aNestedComponent = new Component();
        var anotherNestedComponent = new Component();
        var aComponent = new NestableComponent();
        var container = createTestContainer();
        aComponent.setContainer(container.get('id'));
        aComponent.host(aNestedComponent);
        aComponent.host(anotherNestedComponent);

        aComponent.setName("chauirules")
        var anyId = aNestedComponent.getUniqueID();
        var anotherNestedId = anotherNestedComponent.getUniqueID();

        expect(anyId).not.toEqual(anotherNestedId);
    });

    it("destroy nested components when destroy component", function () {
        var anyComponent = new Component();
        var aComponent = new NestableComponent();
        var container = createTestContainer();
        aComponent.setContainer(container.get('id'));
        aComponent.host(anyComponent);

        aComponent.draw()
        var anyComponentId = anyComponent.getUniqueID();
        var aComponentId = aComponent.getUniqueID();
        aComponent.destroy();

        expect($defined($(aComponentId))).toBeFalsy();
        expect($defined($(anyComponentId))).toBeFalsy();

    });

    //TODO: HOST A COLLECTION OF COMPONENTS

    function createTestContainer() {
        $("xhtmlToTest").erase('html');
        var container = new Element('div', {
            "id": "testingContainer"
        }).inject($("xhtmlToTest"));
        return container;
    }

});