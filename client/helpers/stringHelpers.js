Template.registerHelper('truncate', function(string, length) {
  var cleanString = _(string).stripTags();
  return _(cleanString).truncate(length);
});

Template.registerHelper('targetDateDisplay', function(date){
    var momentFromDate = moment(date);
    var getMonth = momentFromDate.format('MMMM');
    var getYear = momentFromDate.format('YYYY');
    return getMonth + ' ' + getYear;
});

Template.registerHelper('profileNames', function(memberId){
	return Meteor.users.find({_id: memberId } , {'_id': 0, 'profile.name': 1});
});

Template.registerHelper('userName', function(userId){
	return Meteor.users.find({_id: userId } , {'_id': 0, 'profile.name': 1});	
});
