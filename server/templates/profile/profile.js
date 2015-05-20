Meteor.methods({
    updateemailfunction: function (email) {
        return Meteor.users.update({_id:Meteor.user()._id}, {$set: {'emails.0.address': email}});
    }
});