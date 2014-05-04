/*global Ember, DS */
window.App = Ember.Application.create();

var dbRoot = "https://shining-fire-2692.firebaseio.com/";
var dbRef = new Firebase(dbRoot);

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
	firebase: dbRef
});

