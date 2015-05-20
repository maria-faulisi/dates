var targetMonthYear;
var prevMonth;
var nextMonth;
var datesDataArray;
var id;
var datesEventId;

Template.pickDates.onRendered(function(){  

    //get users dates for event
    var datesDataAll = Dates.find({'event_id': this.data._id, 'eventMember_id': Meteor.userId()},{"_id": 1,"memberDatesPicked": 1}).fetch();
    id = datesDataAll[0]['_id'];
    datesDataArray = datesDataAll[0]['memberDatesPicked'];
    //console.log(datesDataArray);


    //get reference to the div #pickDatesCal
    var $calContainer = $('#pickDatesCal');
	//get the target month and year from db
	targetMonthYear = this.data.eventMonthYear;

	var targetMoment = moment(targetMonthYear);

	var prevChosenMoment = moment(targetMonthYear).subtract(1, 'M');

	var nextChosenMoment = moment(targetMonthYear).add(1, 'M');

    var calendar = $calContainer.fullCalendar({
    	header:{
    		today: false,
    		left: 'prev',
    		right: 'next',
    		center: 'title'
    	},
    	defaultDate: targetMonthYear,
    	/*dayRender function handling the intial rendering of days on page load*/
        dayRender: function (date, cell) {
            /*For each item in the datesDataArray onLoad adding the toggleOn class*/
            $.each(datesDataArray,function(index,value){
                $("td[data-date='"+value+"']").addClass('toggleOn');
            });
        },
        viewRender: function(view, element){
            var calCurrent = $calContainer.fullCalendar('getDate');
            if(calCurrent < prevChosenMoment){
                $calContainer.fullCalendar('gotoDate', prevChosenMoment);
            }
            if(calCurrent > nextChosenMoment){
                $calContainer.fullCalendar('gotoDate', nextChosenMoment);
            }
        },
		dayClick:function(date,jsEvent,view){
	        /*OnClick storing day in DayClicked in a format of YYYY-MM-DD*/
	        var DayClicked =  $.fullCalendar.moment(date).format('YYYY-MM-DD');
	        $(this).toggleClass( "toggleOn" );
	        /*If the day has a class of toggleOn pusinh into the datesDataArray array else looping array and removing it*/
	        if($(this).hasClass("toggleOn"))
	        {
	            //console.log('On');
	            datesDataArray.push(DayClicked);
	        }else{
	            //console.log('Off');
	            for(var z = datesDataArray.length; z--;) {
	                if (datesDataArray[z] === DayClicked) {
	                    datesDataArray.splice(z, 1);
	                }
	            }
	        }
	        //console.log(datesDataArray);
        }//closes dayClick
    })//closes calendar
});//closes onRendered

Template.pickDates.events({
    'click #submitDatesChosen': function(){
        //console.log(datesDataArray);
        //id = Dates.find({'event_id': this._id, 'eventMember_id': Meteor.userId()},{"_id": 1,"memberDatesPicked": 1}).fetch();
        Dates.update({'_id': id}, {$set: {'memberDatesPicked': datesDataArray}});
        //console.log(this._id);
        Router.go('eventPage', {_id: this._id});
    }
});


