Meteor.publish('getUserDates', function(eventId){
	return Dates.find({'event_id': eventId, 'eventMember_id': this.userId},{"_id": 1, "memberDatesPicked": 1});
});
Meteor.publish('getAllMembersDates', function(id){
	return Dates.find({'event_id': id});
});