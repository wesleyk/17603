App.ReminderRoute = Ember.Route.extend({
    model: function() {
        var allEvents = this.store.all(App.Event);
		var now = (new Date).getTime();
        var filtered = allEvents.filter(function(item, index, self) {
			if (!item.get('remind')) { return false;}
			var date = Ember.Date.parse(item.get("date"), '%Y-%m-%d');
			var reminder_interval = item.get("reminder_interval") * 86400000;
			item.set("test", "aaa");
			if (date - now < 0) {
				console.log(item.set("place") + "is overdue");
				return false;
			}
            return (date - now < reminder_interval);
        })
        return filtered
    }
});