describe("Handler", function () {

    it("page is document.page", function () {
        var aHandler = new Handler();
        document.page = new Page();
        document.page.tag = "Tag";
        var result = aHandler.getPage();

        expect(aHandler.getPage().tag).toEqual("Tag");
    });

    it("has an owner", function () {
        var aHandler = new Handler();
        var anObject = {};

        aHandler.setOwner(anObject);

        expect(aHandler.getOwner()).toEqual(anObject);
    });

});