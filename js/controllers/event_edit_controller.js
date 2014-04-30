/**
 * Created by Sasha on 4/7/2014.
 */
App.EventEditController = Ember.ObjectController.extend({
    needs: ['auth'],
    authBinding: "controllers.auth",
    actions: {
        save: function(){
            var event = this.get('model');
            event.set("user", this.get('auth.currentUser.id'));
            // this will tell Ember-Data to save/persist the new record
            event.save();
            // then transition to the current user
            this.transitionToRoute('event', event);
        }
    },
    eventTypes: ["Birthday", "Sporting Event", "Family Event"]
});