describe("Renderer", function () {
    it("initialization sets container to document.body", function () {
        var aRenderer = new Renderer();
        expect(aRenderer.getContainer()).toEqual(document.body);
    });
});