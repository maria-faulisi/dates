Meteor.startup(function () {
    _.extend(Notifications.defaultOptions, {
        timeout: 3000
    });
});

Template.dashboard.rendered = function() {

    Session.set("hideButtons", true);
    Session.set("invitedEventsCheck", true);
    Session.set("yourEventsCheck", true);
};

Template.dashboard.helpers({

    hidingButtons: function() { return Session.get('hideButtons'); },
    yourEventsCheck: function() { return Session.get('yourEventsCheck'); },
    invitedEventsCheck: function() { return Session.get('invitedEventsCheck'); },

    hasEvents: function(){
        if(Events.find({$or: [{userId: Meteor.userId()}, {'groupMembers.memberId': Meteor.userId()}]}).count() === 0){
            Session.set("hideButtons", false);
            return false;
        }else{
            Session.set("hideButtons", true);
            return true;
        }
    },
    yourEvents: function(){
        if(Events.find({userId: Meteor.userId()}).count() === 0){
            //console.log('yourevents false');

            Session.set("yourEventsCheck", false);

        }else{
           // console.log('yourevents true');

            Session.set("yourEventsCheck", true);
            return Events.find({userId: Meteor.userId()});
        }
    },
    invitedEvents: function(){
        if(Events.find({'groupMembers.memberId': Meteor.userId()}).count() === 0){
            //console.log('invites false');

            Session.set("invitedEventsCheck", false);
        }else{
           // console.log('invites true');

            Session.set("invitedEventsCheck", true);
            return Events.find({'groupMembers.memberId': Meteor.userId()});
        }
    }
});

Template.dashboard.events({

    'click .eventLink': function(e){
        e.preventDefault();
        var thisId = this._id;
        Session.set('newEventId', thisId);
        Router.go('eventPage', {_id: thisId});
    },
    'click .editEventBtn': function(e){
        e.preventDefault();
        var thisId = this._id;
        Router.go('editEvent', {_id: thisId});
    },
    'click .deleteEventBtn': function(e){
        e.preventDefault();
        var thisId = this._id;
        var confirm = window.confirm("Are you sure you want to delete this event?");
        if(confirm === true){
            Events.remove({_id: thisId});
        }
        Notifications.error('Event Deleted', 'Your event was deleted successfully');
    },
    'click #pickDatesBtn': function(){
        Router.go('pickDates', {_id:this._id});
    }
});

