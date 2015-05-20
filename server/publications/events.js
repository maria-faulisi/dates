Meteor.publish('events', function(){
	return Events.find({userId: this.userId});
});


Meteor.publish('findById', function(){
	return Events.find({_id: this._id});
});

Meteor.publish('usersDates', function(){
	return Events.find({$or: [{userId: this.userId} , {'groupMembers.memberId': this.userId}]});
});
