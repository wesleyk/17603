App.AuthController = Ember.Controller.extend({
  authed: false,
  currentUser: null,

  init: function() {
    var self = this;
    this.authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
      if (error) {
        // TODO: Show user failure message
        console.log('Authentication failed: ' + error);
      } else if (user) {
        console.log('Authentication succeeded');
        console.log(user);

        this.set('authed', true);

        // Find existing user or create new user
        var store = this.get('store');

        persistedUser = this.store.find('user', user.id).then(function(user) {
          return user;
        }, function() {
          delete store.typeMapFor(App.User).idToRecord[user.id];
          var newUser = store.createRecord('user', {
            id: user.id,
            email: user.email,
          });
          newUser.save();
          return newUser;
        });
        this.set('currentUser', persistedUser);
        console.log(this.currentUser);

        // TODO(wesley): Redirect to main calendar page
        self.transitionToRoute('login');
      } else {
        this.set('authed', false);
      }
    }.bind(this));
  },

  actions: {
    createUser: function() {
      var self = this;
      this.authClient.createUser(this.get('new_email'), this.get('new_password'), function(error, user) {
        if (!error) {
          console.log('User Id: ' + user.id + ', Email: ' + user.email);

          // Log user in once they've registered
          self.authClient.login('password', {
            email: self.get('new_email'),
            password: self.get('new_password'),
            rememberMe: true
          });
        } else {
          // TODO: Show user failure message
          console.log('Failed to create user with error: ' + error);
        }
      });
    },

    login: function() {
      this.authClient.login('password', {
        email: this.get('email'),
        password: this.get('password'),
        rememberMe: true
      });
    },

    logout: function() {
      this.authClient.logout();
    }
  }
});
