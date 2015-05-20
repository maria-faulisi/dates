// Publish the user directory which everbody can see
Meteor.publish("userlist", function () {
    try{
        return Meteor.users.find({}, {fields: {
            '_id': 1,
            'profile.firstname': 1,
            'profile.lastname': 1,
            'profile.about': 1,
            'emails':1,
            'emails[0].address': 1
        }});
    }catch(error){
        console.log(error);
    }
});

Meteor.publish('friendsList', function(){

    var currentUser = Meteor.users.findOne(this.userId,{fields: {'profile.friends':1}});
    if (currentUser && currentUser.friends) {
        return Meteor.users.find({ _id: { $in: currentUser.friends } });    
    } else {
        return this.ready();
    }

});