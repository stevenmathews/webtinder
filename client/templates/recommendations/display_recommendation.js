Template.displayRecommendations.helpers({
  token: function() {
    return Session.get('token');
  },
  recommendations: function() {
    return Recommendations.find().fetch();
  },
  getRecommendations: function() {
    var token = Session.get('token');
    Meteor.call('getRecommendations', token, function (err, results) {
      results.forEach(function(result) {
        var recommendation = {
          userId: Meteor.userId(),
          tinderUserId: result._id,
          bio: result.bio,
          birthDate: result.birth_date,
          commonFriendsCount: result.common_friend_count,
          commonFriends: result.common_friends,
          commonLikeCount: result.common_like_count,
          commonLikes: result.common_likes,
          connectionCount: result.connection_count,
          distanceMi: result.distance_mi,
          gender: result.gender,
          name: result.name,
          photos: result.photos,
        }
        Meteor.call('insertRecommendation', recommendation);
      });
    });
  }
});