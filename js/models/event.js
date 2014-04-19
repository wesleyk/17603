App.Event = DS.Model.extend({
    type: DS.attr('string'),
    date: DS.attr('date'),
    time: DS.attr('string'),
    place: DS.attr('string'),
    user: DS.attr('number')
});

