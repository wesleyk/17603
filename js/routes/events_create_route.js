/**
 * Created by Sasha on 4/7/2014.
 */
App.EventsCreateRoute = Ember.Route.extend({
    model: function(){
        // the model for this route is a new empty Ember.Object
        return Em.Object.create({});
    },

    // in this case (the create route), we can reuse the user/edit template
    // associated with the usersCreateController
    renderTemplate: function(){
        this.render('event.edit', {
            controller: 'eventsCreate'
        });
    }
});