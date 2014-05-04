App.EventsController = Ember.ArrayController.extend({
    needs: ['auth'],
    sortProperties: ['date'],
    sortAscending: true // false = descending

});
