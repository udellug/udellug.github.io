# udellug.github.io Documentation

## Calendar Script

The calendar on the website is linked to the calendar at udellug@gmail.com via the Google Calendar API. To edit the calendar, you only need to edit the main Google calendar which should be shared with edit permissions to LUG officers. If the calendar changes in the future, replace `CALENDAR` in `config.js` with the Calendar ID which can be found under the settings for a specific Google calendar and always looks like an email address.

If for some reason the API needs to be changed, credentials can be found in `config.js` and the Google API console can be found [here](https://console.developers.google.com/). Any new API credentials must be configured to only allow requests from udellug.github.io.

The script that communicates with the Google Calendar API is located in `calendar.js`. Documentation for the Calendar API can be found [here](https://developers.google.com/calendar/overview "Calendar Documentation"). The script in `calendar.js` was adapted from [this post](https://stackoverflow.com/a/28393656).
