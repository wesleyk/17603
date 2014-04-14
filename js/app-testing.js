/*global Ember, DS */
window.App = Ember.Application.create();

var dbRoot = "https://shining-fire-2692.firebaseio.com/";
var dbRef = new Firebase(dbRoot);

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: dbRef
});

/*=================== TESTS ====================*/

App.setupForTesting();
App.injectTestHelpers();
App.rootElement = '#ember-testing';

module('Integration tests', {
  setup: function() {
    App.reset();
  }
});

test('hello world', function(){
  equal(1, 1, 'Sample test');
});

test('visit home page', function(){
  visit('/');
  andThen(function() {
    equal(find('.title').text(), 'Login:', 'Login page should appear');
  });
});


