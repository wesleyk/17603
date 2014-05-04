/**
 * Created by Sasha on 4/7/2014.
 */
App.EventController = Ember.ObjectController.extend({
    needs: ['auth'],
    // the deleteMode property is false by default
    deleteMode: false,

    actions: {
        delete: function(){
            // our delete method now only toggles deleteMode's value
            this.toggleProperty('deleteMode');
        },
        cancelDelete: function(){
            // set deleteMode back to false
            this.set('deleteMode', false);
        },
        confirmDelete: function(){
            // this tells Ember-Data to delete the current user
            this.get('model').deleteRecord();
            this.get('model').save();
            // and then go to the users route
            this.transitionToRoute('events');
            // set deleteMode back to false
            this.set('deleteMode', false);
        },
        // the edit method remains the same
        edit: function(){
            this.transitionToRoute('event.edit');
        }
    }
});
