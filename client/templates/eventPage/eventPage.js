

Template.eventPage.onRendered(function(){
    /*Get all members dates from dates collection*/
    var allMembersDatesInfo = Dates.find({event_id: this.data._id}).fetch();
    //variable for opacity divided by number of event members
    var opacityPerMember = 1/allMembersDatesInfo.length;
    //variable to hold all event member dates chosen
    var allMembersDates = [];
    //variable for array to hold all member dates with firstInstance identifier
    var eventDataBool = [];
    //variable for all member dates that are first instances
    var eventData =[];
    //variable for allMemberDates sorted
    var sorted = allMembersDates.sort();

    //for each allMembersDates get the memberDatesPicked and store in array
    $.each(allMembersDatesInfo, function(index, value){
        //set variable for each dates object in allMembersDatesInfo
        var individual = allMembersDatesInfo[index]['memberDatesPicked'];
        //loop through each object and push memberDates to allMembersDates array
        $.each(individual, function(index, value){
            allMembersDates.push(value);
        })
    });


    var repeatNumber = function(array, elem, nextElem, prevElem){
        var count = 0;
        var firstInstance;
        for(var i = 0; i < array.length; i++){
            /*Check to make sure current array element matches elem and increment count.  
            if elem is the same as the nextElem but not the same as the prevElement 
            firstInstance is true*/
            if(array[i] === elem && elem === nextElem && elem !== prevElem){
                count++;
                firstInstance = true;
            /*Check to make sure current array element matches elem and increment count.
            if elem is the same as the prevElem firstInstance is false*/
            }else if(array[i] === elem && elem === prevElem){
                count++;
                firstInstance = false;
            /*Check to make sure current array element matches elem and increment count.
            If elem is not the same as the prevElem and is not the same as the nextElem
            firstInstance is true*/
            }else if(array[i] === elem && elem !== prevElem && elem !== nextElem){
                count++;
                firstInstance = true;
            }
        }
        //return elem count and firstInstance to be pushed to eventDataBool array
        return [elem, count, firstInstance];
    };

    //loop through allMembersDates array pushing dates to eventDataBool
    for(var i = 0; i < allMembersDates.length; i++){
        eventDataBool.push(repeatNumber(sorted, allMembersDates[i], allMembersDates[i+1], allMembersDates[i-1]));
    } 
    //function to filter dates grabbing first instance so as not to render more than once
    var isFirstInstance = function(elem){
        if(elem[2] === true){
            return elem;
        }
    };

    //set eventData to the render the date with opacity multiplier
    var eventData = eventDataBool.filter(isFirstInstance);


    //get reference to the targetMonthYear
    var targetMonthYear = this.data.eventMonthYear;   
    //get reference to the #eventCalendar DOM element to hold calendar
    var $calContainer = $('#eventCalendar'); 
    //convert js date to moment
    var targetMoment = moment(targetMonthYear);
    //set variable for month prior to target month
    var prevChosenMoment = moment(targetMonthYear).subtract(1, 'M');
    //set variable for month after target month
    var nextChosenMoment = moment(targetMonthYear).add(1, 'M');
    //make instance of full calendar with options etc.
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
            /*For each item in the eventData onLoad adding the toggleOn class*/
            $.each(eventData,function(index,value){
                $("td[data-date='"+value[0]+"']").addClass('toggleOn').css('opacity', opacityPerMember*value[1]);
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
    })
});


Template.eventPage.events({
    //click listener to submit dates chosen by current user
    'click #pickDatesBtn': function(){
    Router.go('pickDates', {_id:this._id});     
    }
});
