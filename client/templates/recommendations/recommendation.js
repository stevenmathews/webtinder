Template.recommendation.helpers({
  dateToAge: function(dateOfBirth) {
    var date = dateOfBirth.split("T")[0];
    var age = moment().diff(date, 'years');
    return age;
  },
  distance: function(distanceMi) {
    var kmsPerMile = 1.60934
    var kms = (distanceMi * kmsPerMile).toFixed(2);
    return kms;
  },
  unknownPhoto: function (photoId) {
    return photoId === "unknown";
  }
});

Template.recommendation.events({
  'click #pass': function () {
    var recommendationId = this._id;
    var userId = Meteor.userId();
    var token = Session.get('token');
    Meteor.call("pass", userId, this.tinderUserId, token, function(err, res) {
      if (err) { throw err }
      if (res.status === 200)
        Meteor.call("remove", recommendationId, function(err, res) {
          if (err) { throw err }
          if (res === 1) {
            sAlert.error('Passed');
          } else {
            sAlert.error('Please Refresh Browser!');
          }
        });
    });
  },
  'click #like': function () {
    var recommendationId = this._id;
    var userId = Meteor.userId();
    var token = Session.get('token');
    Meteor.call("like", userId, this.tinderUserId, token, function(err, res) {
      if (err) { throw err }
      if (res.match === false) {
        console.log("No Match");
      } else {
        console.log("Match");
      }
      if (res)
        Meteor.call("remove", recommendationId, function(err, res) {
          if (err) { throw err }
          if (res === 1) {
            sAlert.success('Liked', {position: 'top-right'});
          } else {
            sAlert.error('Please Refresh Browser!', {position: 'top-right'});
          }
        });
    });
  }
});