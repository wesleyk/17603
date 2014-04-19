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

/*=================== REGISTRATION TESTS ====================*/

test('LoadPage', function() {
  App.reset();
  visit("/register").then(function() {
    ok(find("Register"));
  });
});

test('EmptyUsername', function() {
  App.reset();
  visit("/register");
  andThen(function() {
    return click("#registerBtn");
  });
  andThen(function() {
	ok(find("Invalid email specified"));
  });
});

test('EmptyPassword', function() {
  App.reset();
  //Register with empty password
  visit("/register");
  andThen(function() {
	fillIn("#new_email", "test@test.com");
    return click("#registerBtn");
  });
  andThen(function() {
	ok(find(""));
  });
});

test('Register', function() {
  App.reset();
  //Register with empty password
  visit("/register");
  andThen(function() {
	fillIn("#new_email", "test@test.com");
	fillIn("#new_password", "test");
    return click("#registerBtn");
  });
  andThen(function() {
	ok(find("Calendar"));
  });
});

test('AlreadyUsedUsername', function() {
  App.reset();
  //Add test user
  visit("/register");
  andThen(function() {
	fillIn("#new_email", "test@test.com");
	fillIn("#new_password", "password");
    return click("#registerBtn");
  });
  
  //Try to add test user again
  visit("/register");
  andThen(function() {
	fillIn("#new_email", "test@test.com");
	fillIn("#new_password", "password");
    return click("#registerBtn");
  });
  andThen(function() {
	ok(find("The specified email address is already in use"));
  });
});

