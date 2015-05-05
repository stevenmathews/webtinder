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

function pass (tinderUserId, token, callback) {
  client.authorize(token, currentUserFacebookId, function () {
    client.pass(tinderUserId, function (err, data) {
      if (err) { return callback(err) }
      callback(null, data)
    })
  })
}

var getRecommendationsSync = Async.wrap(getRecommendations);
var passSync = Async.wrap(pass);

Meteor.methods({
  getRecommendations: function(token) {
    return getRecommendationsSync(token)
  },
  insertRecommendation: function(recommendation) {
    return Recommendations.insert(recommendation);
  },
  pass: function (tinderUserId, token) {
    return passSync(tinderUserId, token);
  },
  remove: function (recommendationId) {
    return Recommendations.remove(recommendationId);
  }
});

// Recommendations.remove({});