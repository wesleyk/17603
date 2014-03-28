/*global Ember, DS, Todos:true */
window.Calendar = Ember.Application.create();

Todos.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: new Firebase("https://shining-fire-2692.firebaseio.com/")
});
