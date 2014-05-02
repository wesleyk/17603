App.Event = DS.Model.extend({
	type: DS.attr(''),
	date: DS.attr(''),
	time: DS.attr(''),
	place: DS.attr(''),
	user: DS.attr(''),
	remind: DS.attr('')
});

