/**
 * Created by Sasha on 4/7/2014.
 */
App.EventsCreateController = Ember.ObjectController.extend({
    needs: ['auth'],
    authBinding: "controllers.auth",
    actions: {
        save: function(){
           // create a record and save it to the store
            var newEvent = this.store.createRecord('event', {
					type: this.get("type"),
					date: this.get("date"),
					time: this.get("time"),
					place: this.get("place"),
					remind: this.get("remind"),
					user: this.get('auth.currentUser.id')});
            console.log(newEvent);
            newEvent.save();
            // redirects to the user itself
            this.transitionToRoute('event', newEvent);
        }
    },
    eventTypes: ["Birthday", "Sporting Event", "Family Event"]
});