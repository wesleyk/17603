App.Router.map(function () {
	this.resource('login', { path: '/' });
	this.resource('register', { path: '/register' });
	this.resource('calendar', { path: '/calendar' });
	this.resource('reminder', { path: '/reminder' })
    this.resource('events', function(){
        this.resource('event', { path:'/:event_id' }, function(){
            this.route('edit');
        });
        this.route('create');
    });
});

