
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('splash', { title: 'Happy Place :)' });
};

exports.register = function(req, res){
  res.render('register', {title: 'Sign Up - Happy Place :)'});
};

exports.profileForm = function(req, res) {
  res.render('profile-form', {
    title: 'Create Your Profile - Happy Place :)',
    layout: 'main-no-header'
  });
};

exports.happyPlace = function (req, res) {
  res.render('happy-place', {
    title: 'My Happy Place :)',
    layout: 'main-no-header'
  });
};

exports.settings = function(req, res) {
  res.render('settings', {
    title: 'Settings - Happy Place :)',
    layout: 'main-no-header'
  });
};