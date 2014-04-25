App.ReminderRoute = Ember.Route.extend({
    model: function() {
		console.log(this.controllerFor("auth").authClient.currentUser)
        return this.store.find("event");
    }
});