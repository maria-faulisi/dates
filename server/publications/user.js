Meteor.publish('userFriends', function() {
	if (!this.userId) return null;

	return Meteor.users.find(this.userId, {
		fields: {friends: 1}
	});
});

Meteor.publish('profileName', function(friendId){
	return Meteor.users.find({_id: friendId},{'_id': 0, 'profile.name': 1});
});