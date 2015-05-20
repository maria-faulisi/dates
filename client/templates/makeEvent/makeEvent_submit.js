/*setup of eventData array, declaring global here so i can edit it in the render and edit events section */
var eventData = [];

//array to put invited groupMembers into
var groupMembers = [];

var thisYear = moment().year();
var thisMonth = moment().month();
Session.set('Year', thisYear);


Template.makeEvent.helpers({
    friends: function () {
        return Meteor.users.find({ _id: { $in: Meteor.user().friends } }); 
    },
    year: function(){
        return Session.get('Year');
    }
});


Template.makeEvent.events({
    /*Submit function, taking data from page eventName, description, and the array of eventData
     * and storing it to the Events collection tied to the userID*/
    'submit form': function(e){
        e.preventDefault();
        Session.set("hideButtons", true);
        var newEventName = $(e.target).parent().find('#eventName').val();
        var newEventMonth = $('div.toggleOn').data('month');
        var eventDescription = document.getElementById("eventDescription").value;
        var newEvent = {
            'userId': Meteor.userId(),
            'eventName': newEventName,
            'description': eventDescription,
            'dates': eventData,
            'eventMonthYear': new Date(Session.get("Year"), newEventMonth),
            'groupMembers':groupMembers
        };
        //make sure event name, month and year are not void
        if(newEventName ==='' || newEventMonth === undefined || ((newEventMonth < thisMonth) && (Session.get('Year') === thisYear))){
            Notifications.error(newEvent.eventName, 'All new events must have an Event name and a Valid Month');
        }else{

            Session.set('Year', thisYear);
            newEvent._id = Events.insert(newEvent);
            Session.set('newEventId', newEvent._id);

            //create Dates db record for eventCreator
            Dates.insert({
                'event_id': newEvent._id,
                'eventMember_id': Meteor.userId(),
                'memberDatesPicked': []
            });


            //create Dates db record for each groupMember
            for(var i = 0; i < groupMembers.length; i++){
                var newDatesPicked = {
                    'event_id': newEvent._id,
                    'eventMember_id': groupMembers[i].memberId,
                    'memberDatesPicked': []
                };
                Dates.insert(newDatesPicked);
            }

            /*resetting the eventData array*/
            eventData = [];
            groupMembers = [];

            Router.go('eventPage', newEvent);
            Notifications.success(newEvent.eventName, 'New Event was Created successfully');
        }
    },

    'click .addBtn': function(e) {
        e.preventDefault();
        var newMember = {
            "memberId": this._id
        };

        if($(event.target).hasClass("toggleOn"))
        {
            //console.log('friend on');
            groupMembers.push(newMember);
        }else{
            //console.log('friend Off');
            for(var z = groupMembers.length; z--;) {
                if (groupMembers[z].memberId === this._id) {
                    groupMembers.splice(z, 1);
                }
            }
        }

        //console.log(groupMembers);
    },

    'click #prevYear': function(){
        //get current year and subtract a year
        var x = Session.get('Year');
        var prevYear = x - 1;
        //check to make sure prevYear is not less than thisYear
        if(prevYear >= thisYear){
            //store prevYear to Session
            Session.set('Year', prevYear);
        }else if(prevYear < thisYear){
            Session.set('Year', x);
        }
    }, 

    'click #nextYear': function(){
        //take current year and add a year
        var x = Session.get('Year');
        var nextYear = x + 1;
        Session.set('Year', nextYear);
    },

    'click .month': function(e){
        //get reference to event target
        var $this = $(e.target);
        //find all divs with class of .month
        var $months = $('.month');
        //remove .month class from all divs
        $months.removeClass('toggleOn');
        //find closest div with class month from target and add class '.toggleOn'
        $this.closest('.month').addClass('toggleOn');
        //
    }
});





