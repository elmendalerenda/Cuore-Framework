describe("Label Panel", function()
{
	it("inherits Component", function()
	{
		var thePanel = new LabelPanel();

		expect(thePanel instanceof Component).toBeTruthy();
		expect(thePanel instanceof LabelPanel).toBeTruthy();
	});

	it("has 'LabelPanel' as typeName", function()
	{
		var theComponent = new LabelPanel();
		expect(theComponent.getTypeName()).toEqual("LabelPanel");
	});

	it("could be initialized with I18NKey", function()
	{
		var aI18NKey = "CanonicalKey";
		var thePanel = new LabelPanel(aI18NKey);
		expect(thePanel.getI18NKey()).toEqual(aI18NKey);
	});
	
	it("adds the class labelPanel when drawn", function(){
		
		var container = createTestContainer();
		var thePanel = new LabelPanel("CanonicalKey");	
		
		thePanel.setContainer(container.get('id'));
		var id = thePanel.getUniqueID();
		
		thePanel.draw();
		
		expect($(id).hasClass("innerComponentDiv")).toBeTruthy();
		expect($(id).hasClass("labelPanel")).toBeTruthy();
	});

	function createTestContainer()
	{
		$("xhtmlToTest").erase('html');
		var container = new Element('div', {
			"id" : "testingContainer"
		}).inject($("xhtmlToTest"));
		return container;
	}
});