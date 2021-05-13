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
    console.log(isPayrollDay(dayjs()))
}, 5000);

let isMonday = (date) => {
    return date.day() === 1;
}

// untested in a lot of cases, needs refactor. maybe we just count backwards until we have two valid business days between pay date?
let isPayrollDay = (date) => {

    // Numerical day of the month
    const dayOfMonth = date.date();

    // new current date object
    let payDay = dayjs();

    // flag incase payroll needs to deposit on a holiday
    let payOnHoliday = false;

    // set payday to nearest future payday
    payDay = payDay.date(dayOfMonth > paydays[1] ? paydays[0] : paydays[1]);

    // flag if the pay date is a holiday
    if (isHoliday(date)) payOnHoliday = true;

    // subtract two days if payday falls on a holiday, one if it doesn't
    payDay = payDay.date(isHoliday(date) ? payDay.date() - 2 : payDay.date() - 1);

    // subtract one day while payday falls on a weekend (including fridays, we need a day for payroll to process)
    while (isWeekend(payDay))
        payDay = payDay.date(payDay.date() - 1);

    // check to make sure we're not on a holiday now. subtract one day while we are
    while (isHoliday(payDay))
        payDay = payDay.date(payDay.date() - 1);

    return payDay.date() === dayOfMonth;

}

let isHoliday = (date) => {
    // TODO: Figure out how to list holidays
    return false;
}

let isWeekend = (date) => {
    return date.day() >= 5 || date.day() === 0;
}