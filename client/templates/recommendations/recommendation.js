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
    var token = Session.get('token');
    Meteor.call("pass", this.tinderUserId, token, function(err, res) {
      if (err) { throw err }
      if (res.status === 200)
        Meteor.call("remove", recommendationId, function(err, res) {
          if (err) { throw err }
          if (res === 1) {
            console.log('Passed');
          } else {
            console.log('Please Refresh Browser');
          }
        });
    });
  },
  'click #like': function () {
    var recommendationId = this._id;
    var token = Session.get('token');
    Meteor.call("like", this.tinderUserId, token, function(err, res) {
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
            console.log('Liked');
          } else {
            console.log('Please Refresh Browser');
          }
        });
    });
  }
});