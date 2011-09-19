var LabelsService = new Cuore.Class({
    Extends: Service,

    initialize: function () {
        this.parent();
        this.name = 'LABELS';
        this.typeName = 'LabelsService';
        this.cache = document.labels || {};
        this.setLocale(navigator.language || navigator.browserLanguage);
    },

    setLocale: function (aLocale) {
        if (!aLocale) return;

        this.locale = aLocale;
        this.cache[this.locale] = this.cache[this.locale] || {};
    },

    getLabel: function (params, eventName) {
        var eventNameWithKey = eventName + this.SEPARATOR + params.key;
        var cachedLabel = this.fromCache(params.key);
        if (cachedLabel)
            {
                var cachedResponse = new Message();
                cachedResponse.putMapOnQuery(params);       
                cachedResponse.putOnAnswer("text",cachedLabel);
                this.emit(eventNameWithKey, cachedResponse.asJson());   
            }
        else
            {
             if (!params["locale"]) params.locale = this.locale;
             var url = this.getBaseURL() + "/labels/get";
             this.request(url, params, eventNameWithKey)  
            };
    },

    fromCache: function (key) {
        return this.cache[this.locale][key];
    },

    emit: function (eventName, response) {
        var theKey = this.extractKey(eventName);
        if (!theKey) return;
        var theMessage = new Message(response);        
        if (theMessage.getFromAnswer("text")!="")
        {
            this.cache[this.locale][theKey]= theMessage.getFromAnswer("text");
        }
        if (!this.cache[this.locale][theKey]) {
            theMessage.putOnAnswer("text",theKey);
        }
        this.parent(eventName,theMessage.asJson());
    },

    extractKey: function (eventName) {
        var match = eventName.match(/_([a-zA-Z\.]*)$/),
            theKey = match ? match[1] : null;

        return theKey;
    }
});
