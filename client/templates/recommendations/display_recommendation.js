Template.displayRecommendations.helpers({
  token: function() {
    return Session.get('token');
  },
  recommendations: function() {
    return Recommendations.find().fetch();
  },
  getRecommendations: function() {
    var userId = Meteor.userId();
    var token = Session.get('token');
    Meteor.call('getRecommendations', userId, token, function (err, results) {
      if (err) { throw err }
      processResults(results);
      insertProcessedResults(recommendations);
    });
  }
});

var recommendations = []

function processResults(results) {
  results.forEach(function(result) {
    var recommendation = {
      userId: Meteor.userId(),
      tinderUserId: result._id,
      bio: result.bio,
      birthDate: result.birth_date,
      commonFriends: result.common_friends,
      commonLikes: result.common_likes,
      connectionCount: result.connection_count,
      distanceMi: result.distance_mi,
      name: result.name,
      photos: result.photos,
    }
    recommendations.push(recommendation)
  });
}

function insertProcessedResults(recommendations) {
  recommendations.forEach(function(recommendation) {
    Meteor.call('insertRecommendation', recommendation);
  });
}