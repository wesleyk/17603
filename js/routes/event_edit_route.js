/**
 * Created by Sasha on 4/7/2014.
 */
App.EventEditRoute = Ember.Route.extend({
    model: function(){
        return this.modelFor('event');
    }
});