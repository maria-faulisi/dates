Dates = new Mongo.Collection('dates');

Dates.allow({
	insert: function(dateId, doc){
		return !! dateId;
	},
	remove: function(dateId, doc){
		return !! dateId;
	},
	update: function(dateId, doc, fieldnames){
		return !! dateId;
	}
});

