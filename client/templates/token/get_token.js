Template.getToken.events({
  'submit form': function (e) {
    e.preventDefault();
    var url = $(e.target).find('[name=url]').val();
    var token = url.substr(65).split('&')[0];
    Session.set('token', token);
  }
});