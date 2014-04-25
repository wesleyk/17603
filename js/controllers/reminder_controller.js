App.ReminderController = Ember.ArrayController.extend({
    needs: ['auth'],
    authBinding: "controllers.auth"
	/*sortProperties: ['date', ],
	sortAscending: true,
	sortFunction: function(a,b) {
    // your custom sort logic here
    // return 0 if the two parameters are equal, return a negative value if the first parameter is smaller than the second or return a positive value otherwise
  }*/
});
