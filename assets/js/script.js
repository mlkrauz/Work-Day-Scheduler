
var scheduleList = [];
const startHour = 7; //7am
const endHour = 17; //5pm

function defaultScheduleList() {
    //redeclare the list... just to prevent weird bugs.
    scheduleList = [];
    
    for (var i = startHour; i <= endHour; i++) {
        //Handle am/pm
        var hour = i;
        var suffix = "AM";
        if (i > 12) {
            hour = hour - 12;
            suffix = "PM"
        } else if (i === 12) {
            suffix = "PM"
        }

        time = hour + suffix;
        scheduleList.push({hour: time, text: "", momentCompatibleHour: i-1});
    }
}

function getSchedule() {
    var localScheduleList = JSON.parse(localStorage.getItem("scheduleList"));

    //Is this the first time we're running?
    if (localScheduleList === null) {
        defaultScheduleList();
        setSchedule();
    } else {
        scheduleList = localScheduleList;
    }
}

function setSchedule() {
    localStorage.setItem("scheduleList", JSON.stringify(scheduleList));
}

function textInputClassSelection(momentCompatibleHour) {
    //there's definitely a better way to handle am/pm, but this is the way I set up the schedule...
    var thisHour = moment().hour();
    console.log(momentCompatibleHour, thisHour);

    //return past, present, or future, depending on comparison.
    if (thisHour > momentCompatibleHour) {
        return "past";
    } else if (thisHour === momentCompatibleHour) {
        return "present"
    } else if (thisHour < momentCompatibleHour) {
        return "future"
    } else {
        console.log("Bizarre bug, please fix.");
    }
}

function createScheduleRowElement(scheduleObject) {
    //create elements
    var scheduleRowEl = $(`<div class="row time-block"></div>`);
    var hourEl = $(`<div class="hour col-1">${scheduleObject.hour}</div>`);
    var textInputEl = $(`<textarea class="description col-10">${scheduleObject.text}</textarea>`);
    var saveButtonEl = $('<button class="saveBtn col-1">SAVE</button>');

    //get the correct class string from the textInputClassSelection method.
    textInputEl.addClass(textInputClassSelection(scheduleObject.momentCompatibleHour));

    //append and return
    scheduleRowEl.append(hourEl);
    scheduleRowEl.append(textInputEl);
    scheduleRowEl.append(saveButtonEl);
    return scheduleRowEl;
}

function buttonClickedEvent() {

}

function init() {
    //Set text of the "currentDay" <p> element to today's date.
    var currentDayMoment = moment().format("LLLL");
    $("#currentDay").text(currentDayMoment);

    getSchedule();

    //create and append schedule rows
    for (var i = 0; i < scheduleList.length; i++) {
        $(".container").append(createScheduleRowElement(scheduleList[i]));
    }
}

init()