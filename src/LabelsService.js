var LabelsService = new Class({
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
        if (cachedLabel) {
            var cachedParams = [];
            cachedParams["answer"] = cachedLabel;
            this.emit(eventNameWithKey, cachedParams);
        } else {
            var dataToSend = {
                "LABEL_KEY": params.key,
                "LOCALE": this.locale
            };

            var url = this.getBaseURL() + "labels/get";
            this.request(url, dataToSend, eventNameWithKey);
        }
    },

    fromCache: function (key) {
        return this.cache[this.locale][key];
    },

    emit: function (eventName, params) {
        var theKey = this.extractKey(eventName);
        if (!theKey) return;
        params = params || {};

        this.cache[this.locale][theKey] = params.answer;

        if (!this.cache[this.locale][theKey]) {
            params.answer = theKey;
        }
        this.parent(eventName, params);
    },

    extractKey: function (eventName) {
        var match = eventName.match(/_([a-zA-Z\.]*)$/),
            theKey = match ? match[1] : null;

        return theKey;
    }
});
