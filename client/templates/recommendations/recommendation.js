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