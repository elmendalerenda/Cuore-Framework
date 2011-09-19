describe("setTextHandler", function () {

    it("inherits  Handler", function () {
        var aSetTextHandler = new SetTextHandler();
        expect(aSetTextHandler instanceof Handler).toBeTruthy();
        expect(aSetTextHandler instanceof SetTextHandler).toBeTruthy();
        expect(aSetTextHandler.debug).toBeDefined();
    });

    it("sets the text of the owner reading as json object when dispatched", function () {
        var aSetTextHandler = new SetTextHandler();

        var testText = "testText";
        var aButton = {};
        var settedText = null;

        aButton.setText = function (text) {};
        spyOn(aButton,"setText");

        aSetTextHandler.setOwner(aButton);

        var theMessage= new Message();
        theMessage.putOnAnswer("text",testText);
        
        var correctMessage = theMessage;
       
        var incorrectMessage = new Message();

        aSetTextHandler.handle(correctMessage);
        expect(aButton.setText).toHaveBeenCalledWith(testText);

        aButton.setText.reset();
        aSetTextHandler.handle(incorrectMessage);

        expect(aButton.setText).not.toHaveBeenCalled();
    }); 
});