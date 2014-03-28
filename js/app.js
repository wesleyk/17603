/*global Ember, DS, Todos:true */
window.Calendar = Ember.Application.create();

Calendar.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase("https://shining-fire-2692.firebaseio.com/")
});
