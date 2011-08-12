describe("Debuggable", function() {
	
	var Debuggable = new Cuore.Class({
		debug: function(object) {
		  var debugModeON = (document.debugMode == true);
		  var debugThisType = document.debugTypes && (document.debugTypes[this.typeName] === true);

			if (debugModeON || debugThisType) {
				console.log (object);
			}
		}	
	});
	

	it("logs at console if debug mode is enabled", function() {
		if(!window.console) {
			console = {};
		}   
			
		var debugLine = false;
		var originalLog = console.log;
		console.log = function(object) {
			debugLine = object;
		};
		var aDebuggable = new Debuggable();
		aDebuggable.debug("debug");
		expect(debugLine).toBeFalsy();

		document.debugMode = true;
		aDebuggable.debug("debug");
		expect(debugLine).toEqual("debug");

		console.log = originalLog;
		document.debugMode = false;
	});
	
	it(" logs to console  by typename", function() {
		
		if(!window.console) {
			console = {};
		}
			
		var debugLine = false;
		originalLog = console.log;
		console.log = function(object) {
			debugLine = object;
		};
		var aDebuggable = new Debuggable();
		aDebuggable.typeName="aTypeName";
		aDebuggable.debug("debug");
		expect(debugLine).toBeFalsy();

		document.debugTypes={};
		document.debugTypes["otherTypeName"] = true;
		aDebuggable.debug("debug");
		expect(debugLine).toBeFalsy();
		
		document.debugTypes["aTypeName"] = true;
		aDebuggable.debug("debug");
		expect(debugLine).toEqual("debug");

		console.log = originalLog;
		document.debugMode = false;
	});

});