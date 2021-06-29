








function init() {
    //Set text of the "currentDay" <p> element to today's date.
    var currentDayMoment = moment(new Date()).format("dddd, MMMM Mo, YYYY [ | ] hA");
    $("#currentDay").text(currentDayMoment);
}

init()