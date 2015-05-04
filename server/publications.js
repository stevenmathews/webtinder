Meteor.publish('recommendations', function () {
  return Recommendations.find({userId: this.userId});
});