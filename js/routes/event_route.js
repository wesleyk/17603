/**
 * Created by Sasha on 4/7/2014.
 */
App.EventRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('event', params._id);
    }
});