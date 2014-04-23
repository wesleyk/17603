/*global Ember, DS */
window.App = Ember.Application.create();

var dbRoot = "https://shining-fire-2692.firebaseio.com/";
var dbRef = new Firebase(dbRoot);

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: dbRef
});

/*=================== BASIC TESTS ====================*/

App.setupForTesting();
App.injectTestHelpers();
App.rootElement = '#ember-testing';

module('Integration tests', {
  setup: function() {
    App.reset();
  }
});

test('hello world', function(){
  App.reset();
  equal(1, 1, 'Sample test');
});

/*=================== LOGIN TESTS ====================*/

test('visit home page', function(){
  App.reset();
  visit('/')
  .then(function() {
    equal(find('.title').text(), 'Login:', 'Login page should appear');
  });
});

test('Login', function(){
  App.reset();
  visit('/');
  fillIn("#email", "test@test.com");
  fillIn("#password", "test");
  click("#loginBtn");
  andThen(function() {
    ok(find("Calendar"));
  });
});

/*=================== REGISTRATION TESTS ====================*/

test('LoadRegisterPage', function() {
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
	ok(find("Invalid password specified"));
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
  visit("/register").then(function() {
	fillIn("#new_email", "test@test.com");
	fillIn("#new_password", "password");
    return click("#registerBtn");
  })
  .then(function() {
  
    //Try to add test user again
    visit("/register").then(function() {
	  fillIn("#new_email", "test@test.com");
	  fillIn("#new_password", "password");
      return click("#registerBtn");
    }).then(function() {
	  ok(find("The specified email address is already in use"));
    });
  });
});

