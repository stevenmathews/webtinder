var tinder = Meteor.npmRequire('tinderjs');
var client = new tinder.TinderClient();

// Authorize function must be called before each action
function getRecommendations(userId, token, callback) {
  var currentUserFacebookId = Meteor.users.find(userId).fetch()[0].services.facebook.id
  client.authorize(token, currentUserFacebookId, function () {
    client.getRecommendations(10, function (err, data) {
      if (err) {
        return callback(err)
      }
      callback(null, data.results)
    });
  });
}

function pass (userId, tinderUserId, token, callback) {
  var currentUserFacebookId = Meteor.users.find(userId).fetch()[0].services.facebook.id
  client.authorize(token, currentUserFacebookId, function () {
    client.pass(tinderUserId, function (err, data) {
      if (err) { return callback(err) }
      callback(null, data)
    })
  })
}

function like (userId, tinderUserId, token, callback) {
  var currentUserFacebookId = Meteor.users.find(userId).fetch()[0].services.facebook.id
  client.authorize(token, currentUserFacebookId, function () {
    client.like(tinderUserId, function (err, data) {
      if (err) { return callback(err) }
      callback(null, data)
    })
  })
}

var getRecommendationsSync = Async.wrap(getRecommendations);
var passSync = Async.wrap(pass);
var likeSync = Async.wrap(like);

Meteor.methods({
  getRecommendations: function(userId, token) {
    return getRecommendationsSync(userId, token)
  },
  insertRecommendation: function(recommendation) {
    return Recommendations.insert(recommendation);
  },
  pass: function (userId, tinderUserId, token) {
    return passSync(userId, tinderUserId, token);
  },
  like: function (userId, tinderUserId, token) {
    return likeSync(userId, tinderUserId, token);
  },
  remove: function (recommendationId) {
    return Recommendations.remove(recommendationId);
  }
});