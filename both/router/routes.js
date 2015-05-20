Router.route('/', {
  name: 'dashboard'
});

Router.route('/loginPage', {
  name: 'loginPage'
});

Router.route('/profile');
Router.route('/friends', {
    name: 'friends',
    waitOn: function(){
        return Meteor.subscribe("userlist");
    }
});

Router.route('/makeEvent',{
	name: 'makeEvent',
    waitOn: function(){
        return Meteor.subscribe("friendsList");
    }
});


Router.route('/eventPage/:_id', {
	name: 'eventPage',
  waitOn: function(){
        return Meteor.subscribe('getAllMembersDates', this.params._id); 
  },
	data: function(){return Events.findOne(this.params._id);}
});

Router.route('/editEvent/:_id', {
	name: 'editEvent',
	data: function(){return Events.findOne(this.params._id);}
});

Router.route('/eventPage/:_id/pickDates', {
  name: 'pickDates',
  waitOn: function(){
    return Meteor.subscribe('getUserDates',this.params._id); 
  },
  data: function(){return Events.findOne(this.params._id);}
});

