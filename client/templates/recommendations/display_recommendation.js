Template.displayRecommendations.helpers({
  recommendations: function () {
    return Recommendations.find().fetch();
  }
});