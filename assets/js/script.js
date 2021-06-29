
var timeBlockList = [];
const startHour = 7; //7am
const endHour = 17; //5pm

function defaultTimeBlocks() {
    //redeclare the list... just to prevent weird bugs.
    timeBlockList = [];
    
    for (var i = startHour; i <= endHour; i++) {
        //Handle am/pm
        var hour = i;
        var suffix = "AM";
        if (i >= 13) {
            hour = hour - 12;
            suffix = "PM"
        }

        time = hour + suffix;
        timeBlockList.push({hour: time, text: ""});
    }
}

function getSchedule() {
    var localTimeBlockList = JSON.parse(localStorage.getItem("timeBlockList"));

    //Is this the first time we're running?
    if (localTimeBlockList === null) {
        defaultTimeBlocks();
        setSchedule();
    } else {
        timeBlockList = localTimeBlockList;
    }
}

function setSchedule() {
    localStorage.setItem("timeBlockList", JSON.stringify(timeBlockList));
}





function init() {
    //Set text of the "currentDay" <p> element to today's date.
    var currentDayMoment = moment().format("LLLL");
    $("#currentDay").text(currentDayMoment);

    getSchedule();
}

init()