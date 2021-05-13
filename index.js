var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);

// Specify timezone desired for date calculations
dayjs.tz.setDefault("America/Denver");

// Days to run payroll
const paydays = [1, 16];

setInterval(() => {
    isPayrollDay(dayjs())
}, 5000);

let isMonday = (date) => {
    return date.day() === 1;
}

let isPayrollDay = (date) => {
    // Sunday through Saturday represented as 0-6
    const dayOfWeek = date.day();

    // Numerical day of the month
    const dayOfMonth = date.date();

    // dayjs object for tomorrow
    const tomorrow = date.date(dayOfMonth + 1);
    
    // Basic check if tomorrow's date is payday -- returns true if tomorrow is in paydays array && tomorrow is Monday thru Thursday
    if((tomorrow.date() === paydays[0] || tomorrow.date() === paydays[1]) && (tomorrow.day() > 0 && tomorrow.day() < 5)) return true;
}