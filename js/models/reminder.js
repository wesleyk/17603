App.Reminder = DS.Model.extend({
	when: DS.attr('date'), //TODO: figure out how to store time
	event: DS.belongsTo('event'),
	user: DS.belongsTo('user'),
	desc: DS.attr('string'),
});