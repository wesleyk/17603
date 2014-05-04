App.ReminderController = Ember.ArrayController.extend({
  needs: ['auth'],
  sortProperties: ['date'],
  sortAscending: true
});
