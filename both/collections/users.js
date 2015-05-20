

Meteor.users.allow({
	update: function(userId, doc, fieldnames){
		return userId === doc._id;
	}
});

