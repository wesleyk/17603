App.AuthController = Ember.Controller.extend({
  authed: false,
  currentUser: null,

  init: function() {
    this.authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
      if (error) {
        console.log('Authentication failed: ' + error);
      } else if (user) {
        console.log('Authentication succeeded');

        this.set('authed', true);
        var userRef = new Firebase(usersPath + '/' + user.id);
        var controller = this;
        var properties = {
          id: user.id,
          email: user.email,
        };
        userRef.once('value', function(snapshot) {
          var user = App.User.create({ ref: userRef });
          user.setProperties(properties);
          controller.set('currentUser', user);
        });
      } else {
        this.set('authed', false);
      }
    }.bind(this));
  },

  actions: {
    createUser: function() {
      console.log('hi');
      console.log(this.get('newEmail'));
      console.log(this.get('newPassword'));
      this.authClient.createUser(this.get('newEmail'), this.get('newPassword'), function(error, user) {
        if (!error) {
          console.log('User Id: ' + user.id + ', Email: ' + user.email);
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
