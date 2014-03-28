# EmberFire (Firebase + Ember Data)

EmberFire is an officially supported adapter for using
[Firebase](http://www.firebase.com/?utm_medium=web&utm_source=emberFire) with
[Ember Data](https://github.com/emberjs/data).

The `DS.FirebaseAdapter` provides all of the standard `DS.Adapter` methods and will automatically synchronize the store with Firebase

## Installation

```html
<!-- Don't forget to include Ember and its dependencies -->
<script src="http://builds.emberjs.com/canary/ember-data.js"></script>
<script src="https://cdn.firebase.com/js/client/1.0.6/firebase.js"></script>
<script src="emberfire.js"></script>
```

## Usage

To get started, simply create an instance of the
`DS.FirebaseAdapter` in your app:

```js
App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: new Firebase('https://<my-firebase>.firebaseio.com')
});
```

You're Firebase data will now be synced with the Ember Data store

You can now interact with the data store as you normally would. For example,
calling `find()` with a specific ID will retrieve that record from Firebase.
Additionally, from that point on, every time that record is updated in Firebase,
it will automatically be updated in the local data store.

See the [Ember documentation](http://emberjs.com/guides/models/) for a full
list of methods, including ways to create, find, delete and query records.

### Relationships

EmberFire can handle relationships in two different ways

#### Async

Any relationship that is flagged as `async: true` tells the adapter to fetch
the record if it hasn't already been loaded

```js
App.Post = DS.Model.extend({
  comments: DS.hasMany('comment', { async: true })
});
```

In the `App.Post` example, comments will be fetched from
`https://<my-firebase>.firebaseio.com/comments` 

Here is what the data structure would look in Firebase:

```json
{
  "posts": {
    "-JIzst0Wbx-zjKKNtl8a": {
      "comments": {
        "-JIzsxCt35JEnay7AKY5": true
      }
    }
  },
  "comments": {
    "-JIzsxCt35JEnay7AKY5": {
      "body": "This is a comment"
    }
  }
}
```

*\*The IDs used in the example are arbitrary*

#### Embedded

Any relationship that is flagged as `embedded: true` tells the adapter
that the related records have been included in the payload.

Generally, this approach is more complicated and not as widley used,
but it has been included to support existing data structures.

```js
App.Post = DS.Model.extend({
  comments: DS.hasMany('comment', { embedded: true })
});
```

Here is what the data structure would look like in Firebase:

```json
{
  "posts": {
    "-JIzst0Wbx-zjKKNtl8a": {
      "comments": {
        "-JIzsxCt35JEnay7AKY5": {
          "body": "This is a comment"
        }
      }
    }
  }
}
```

**NOTE**: When a modal has embedded relationships, the related model
can't be saved on it's own.

```js
var comment = store.createRecords('comment');
// This won't work because the adapter doesn't know
// where to save the comment without the context of the post
comment.save();
```

Instead, the comment needs to be added to the post
and then the post can be saved

```js
// Add the new comment to the post and save it
post.get('comments').addObject(comment);
// Saving the post will then save the embedded comments
post.save()
```

## Development

If you would like to build EmberFire from the source, use grunt to build and lint the code:

```bash
# Install Grunt and development dependencies
npm install

# Default task - validates with jshint and minifies source
grunt

# Watch for changes and run unit test after each change
grunt watch

# Minify source
grunt build
```

## License

[MIT](http://firebase.mit-license.org).
