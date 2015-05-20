Router.configure({



  controller: 'AppController',
  loadingTemplate: 'loading'


});

// Router.plugin('loading', {loadingTemplate: 'loading'});
Router.plugin('dataNotFound', {dataNotFoundTemplate: 'notFound'});

var OnBeforeActions;



OnBeforeActions = {
  loginRequired: function() {
    if (!Meteor.userId()) {
      this.render('loginPage');
    }
    else {
      this.next();
    }
  }
};
Router.onBeforeAction(OnBeforeActions.loginRequired, {
  only: ['profile', 'dashboard']
});
