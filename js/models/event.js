App.Event = DS.Model.extend({
	type: DS.attr(),
	date: DS.attr(),
    time: DS.attr(),
    place: DS.attr()
});


App.Event.FIXTURES = [{
    id: 1,
    type: 'Birthday',
    date: '04/07/2014',
    time: '20:23:43',
    place: 'Pittsburgh'
}, {
    id: 2,
    type: 'Sporting Event',
    date: '04/07/2014',
    time: '20:23:43',
    place: 'New York'
}
];
