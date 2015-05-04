var tinder = Meteor.npmRequire('tinderjs');
var client = new tinder.TinderClient();
var currentUserFacebookId = Meteor.users.find().fetch()[0].services.facebook.id

// Authorize function must be called before each action
function getRecommendations(token, callback) {
  client.authorize(token, currentUserFacebookId, function () {
    client.getRecommendations(10, function (err, data) {
      if (err) {
        return callback(err)
      }
      callback(null, data.results)
    });
  });
}

var getRecommendationsSync = Async.wrap(getRecommendations);

Meteor.methods({
  getRecommendations: function(token) {
    return getRecommendationsSync(token)
  }
});