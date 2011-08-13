var Bus = new Class({
    Implements: Debuggable,

    initialize: function () {
        this.instanceName = "Bus";
        this.typeName = "Bus";
        this.subscriptions = [];

        document[this.instanceName] = document[this.instanceName] || this;
        return document[this.instanceName];
    },

    subscribe: function (subscriber, eventName) {
        if (!this.subscriptionExists(subscriber, eventName)) {
            this.subscriptions.push([subscriber, eventName]);
        }
    },

    subscribers: function (theEvent) {
        var selectedSubscribers = [];
        for (var i = 0, subscription; subscription = this.subscriptions[i]; i++) {
            if (subscription[1] === theEvent) {
                selectedSubscribers.push(subscription[0]);
            }
        }
        return selectedSubscribers;
    },

    hasSubscriptions: function () {
        return this.subscriptions.length > 0;
    },

    subscriptionExists: function (subscriber, eventName) {
        var result = false;
        var theSubscription = [subscriber, eventName];

        for (var i = 0, subscription; subscription = this.subscriptions[i]; i++) {
            var sameSubscriber = (subscription[0] === theSubscription[0]);
            var sameEvent = (subscription[1] === theSubscription[1]);
            if (sameSubscriber && sameEvent) {
                result = true;
                break;
            }
        }
        return result;
    },


    emit: function (eventName, params) {
        var subscribers = this.subscribers(eventName);
        this.debug("Bus.emit (event, params)");
        this.debug(eventName);
        this.debug(params);
        this.debug("------------");

        for (var i = 0, subscriber; subscriber = subscribers[i]; i++) {
            subscriber.eventDispatch(eventName, params);
        }
    },

    unsubscribe: function (subscriber, events) {
        for (var i = 0, eventName; eventName = events[i]; i++) {
            var theSubscription = [subscriber, eventName];
            this.removeSubscription(theSubscription);
        }
    },

    removeSubscription: function (theSubscription) {
        for (var i = 0, subscription; subscription = this.subscriptions[i]; i++) {
            var sameSubscriber = (subscription[0] === theSubscription[0]);
            var sameEvent = (subscription[1] === theSubscription[1]);
            if (sameSubscriber && sameEvent) {
                this.subscriptions.splice(i, 1);
            }
        }
    },

    reset: function () {
        this.subscriptions = [];
    }
});
