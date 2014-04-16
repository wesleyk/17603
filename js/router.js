App.Router.map(function () {
	this.resource('login', { path: '/' });
	this.resource('register', { path: '/register' });
	this.resource('calendar', { path: '/calendar' });
	this.resource('reminder', { path: '/reminder' })
});

