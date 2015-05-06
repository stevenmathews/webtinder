Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe("recommendations"); }
});

Router.route('/', {name: 'displayRecommendations'});