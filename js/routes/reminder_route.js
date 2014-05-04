App.ReminderRoute = Ember.Route.extend({ 
   model: function() {
        var allEvents = this.store.all(App.Event);
		var now = (new Date).getTime();
        var filtered = allEvents.filter(function(item, index, self) {
			if (!item.get('remind')) { return false;}
			var date = Ember.Date.parse(item.get("date"), '%Y-%m-%d');
			var reminder_interval_days = item.get("reminder_interval")
			var reminder_interval = reminder_interval_days * 86400000;
			if (date - now < 0) {
				console.log(item.get("place") + "is overdue");
				return false;
			}	
			item.set("days_left", Math.round((date - now) / 86400000));
            return (date - now < reminder_interval);
        })

        return filtered
    }
});