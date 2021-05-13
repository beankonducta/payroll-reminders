var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Denver");

setInterval(() => {
    console.log(isMonday(dayjs()));
}, 5000);

// from a date string (new Date()) we can offset -6 hours to get to mountain time
let isMonday = (date) => {
    return date.day() === 1;
}

let isPayrollDay = (date) => {
}