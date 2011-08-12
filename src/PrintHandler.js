var PrintHandler = new Class({
	Extends: Handler, 
	
	initalize: function(){
	    this.typeName = 'PrintHandler';
	},
	
	handle: function() {
	    window.print();
	}
});
