App.ReminderRoute = Ember.Route.extend({
	model: function() {
		return [
			{
				when: new Date(),
				desc: 'Remember milk!',
			},
			{
				when: new Date(),
				desc: 'Go be drunk!',
			},
			{
				when: new Date(),
				desc: 'Learn Ember.js!!!',
			}
			];
  } 
});
