var clientId = config.CLIENT_ID;
var apiKey = config.API_KEY;
var userEmail = config.CALENDAR;
var userTimeZone = "New_York";
var maxRows = 2;
var calName = "test";

var scopes = 'https://www.googleapis.com/auth/calendar';

function padNum(num) {
  if (num <= 9) {
    return "0" + num;
  }
  return num;
}

function monthString(num) {
       if (num === "01") { return "JAN"; }
  else if (num === "02") { return "FEB"; }
  else if (num === "03") { return "MAR"; }
  else if (num === "04") { return "APR"; }
  else if (num === "05") { return "MAJ"; }
  else if (num === "06") { return "JUN"; }
  else if (num === "07") { return "JUL"; }
  else if (num === "08") { return "AUG"; }
  else if (num === "09") { return "SEP"; }
  else if (num === "10") { return "OCT"; }
  else if (num === "11") { return "NOV"; }
  else if (num === "12") { return "DEC"; }
}

function dayString(num){
       if (num == "1") { return "Monday" }
  else if (num == "2") { return "Tuesday" }
  else if (num == "3") { return "Wednesday" }
  else if (num == "4") { return "Thursday" }
  else if (num == "5") { return "Friday" }
  else if (num == "6") { return "Saturday" }
  else if (num == "0") { return "Sunday" }
}

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({
    client_id: clientId,
    scope: scopes,
    immediate: true
  }, handleAuthResult);
}

function handleAuthResult(authResult) {
  if (authResult) {
    makeApiCall();
  }
}

function makeApiCall() {
  var today = new Date(); //today date
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': userEmail,
      'timeZone': userTimeZone,
      'singleEvents': true,
      'timeMin': today.toISOString(), //gathers only events not happened yet
      'maxResults': maxRows,
      'orderBy': 'startTime'
    });
    request.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        var li = document.createElement('li');
        var item = resp.items[i];
        var classes = [];
        var allDay = item.start.date ? true : false;
        var startDT = allDay ? item.start.date : item.start.dateTime;
        var dateTime = startDT.split("T"); //split date from time
        var date = dateTime[0].split("-"); //split yyyy mm dd
        var startYear = date[0];
        var startMonth = monthString(date[1]);
        var startDay = date[2];
        var startDateISO = new Date(startMonth + " " + startDay + ", " + startYear + " 00:00:00");
        var startDayWeek = dayString(startDateISO.getDay());
        if (allDay == true) {
          var str = [
            '<span class="event">',
            item.summary, '<span class="event-info">',
            startDayWeek, ' ',
            startMonth, ' ',
            startDay, ' ',
            startYear,
            '</span></span>'
          ];
        } else {
          var time = dateTime[1].split(":"); //split hh ss etc...
          var startHour = time[0];
          var startMin = time[1];
          var str = [
            '<span class="event">',
            item.summary, '<span class="event-info">',
            startDayWeek, ' ',
            startMonth, ' ',
            startDay, ', ',
            startYear, ' - ',
            startHour, ':', startMin,
            '</span></span>'
          ];
        }
        li.innerHTML = str.join('');
        li.setAttribute('class', classes.join(' '));
        document.getElementById('calendar').appendChild(li);
      }
    });
  });
}
