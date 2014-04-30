App.ReminderRoute = Ember.Route.extend({
    model: function() {
        var allEvents = this.store.all(App.Event)
        var filtered = allEvents.filter(function(item, index, self) {
            return item.get('remind') == true;
        })
        return filtered
    }
});