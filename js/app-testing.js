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

test('visit login... multiple assertions', function() {
    App.reset();
    visit('/').then(function() {
        ok(find("Email"));
        ok(find("Password"));
    });
});

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

/*=================== EVENTS TESTS ====================*/

test('Add Event Button Not Logged In', function() {
  App.reset();
  visit("/events").then(function() {
      click("#add_event");
      andThen(function() {
          ok(find("Choose event type"));
          ok(find("Event date"));
          ok(find("Event start"));
          ok(find("Event place"));
          ok(find("Remind?"));
          ok(find("Ok"));
      });
  });
});

test('Add Event Button Logged In', function() {
  App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
          ok(find("Choose event type"));
          ok(find("Event date"));
          ok(find("Event start"));
          ok(find("Event place"));
          ok(find("Remind?"));
          ok(find("Ok"));
      });
    });
  });
});

test('Add Event', function() {
  App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
        fillIn("#event-date", "2015-12-25");
        // Times are 24-hour clock
        fillIn("#event-time", "12:30");
        fillIn("#event-place", "CMU");
        click("#save-event").then(function() {
            ok(find("2015-12-25"));
        });
      });
    });
  });
});

test('Change Event Type', function() {
    App.reset();

    visit('/events/create').then(function() {
        $("#event-type").val("Sporting Event");
        ok(find("Sporting Event"));
    });
});

test('Add Different Event', function() {
  App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
	    $(dropdown).val("Sporting Event");
        fillIn("#event-date", "2015-12-25");
        // Times are 24-hour clock
        fillIn("#event-time", "12:30");
        fillIn("#event-place", "CMU");
        click("#save-event").then(function() {
		  click("#2015-12-25").then(function() {
            ok(find("Sporting Event"));
		  });
        });
      });
    });
  });
});

test('Add Event and Remind', function() {
  App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
        fillIn("#event-date", "2015-12-25");
        // Times are 24-hour clock
        fillIn("#event-time", "12:30");
        fillIn("#event-place", "CMU");
        cllick("#event-remind");
        click("#save-event").then(function() {
            ok(find("2015-12-25"));
            visit("/reminders").then(function() {
              ok(find("2015-12-25"));
            });
        });
      });
    });
  });
});

test('Add Incomplete Event', function() {
  App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
        fillIn("#event-date", "2015-12-25");
        // Times are 24-hour clock
        click("#save-event").then(function() {
            ok(find("Choose event type"));
            ok(find("Event date"));
            ok(find("Event start"));
            ok(find("Event place"));
            ok(find("Remind?"));
            ok(find("Ok"));
        });
      });
    });
  });
});

test('Edit Event', function() {
   App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
        fillIn("#event-date", "2015-12-25");
        // Times are 24-hour clock
        fillIn("#event-time", "12:30");
        fillIn("#event-place", "CMU");
        click("#save-event").then(function() {
          click("#2015-12-25").then(function() {
		    click("#edit-btn").then(function() {
			  ok(find("Choose event type"));
              ok(find("Event date"));
              ok(find("Event start"));
              ok(find("Event place"));
              ok(find("Remind?"));
              ok(find("Ok"));
			});
	      });
        });
      });
    });
  });
});

test('Delete Event', function() {
  App.reset();
  
  visit('/').then(function() {
    fillIn("#email", "test@test.com");
    fillIn("#password", "test");
    click("#loginBtn");
    andThen(function() {
      click("#events-link").then(function() {
        fillIn("#event-date", "2015-12-25");
        // Times are 24-hour clock
        fillIn("#event-time", "12:30");
        fillIn("#event-place", "CMU");
        click("#save-event").then(function() {
          click("#2015-12-25").then(function() {
		    click("#delete-btn").then(function() {
			  click("#confirm-delete-btn").then(function() {
			    ok(!find("#2015-12-25");
			  });
			});
	      });
        });
      });
    });
  });
});

