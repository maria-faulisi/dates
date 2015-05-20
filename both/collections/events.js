Events = new Mongo.Collection('events');

Events.allow({
	insert: function(userId, doc){
		return !! userId;
	},
	remove: function(userId, doc){
		return !! userId;
	},
	update: function(userId, doc, fieldnames){
		return !! userId;
	}
});

