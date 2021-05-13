var dotenv = require('dotenv').config()

var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

// Numbers to send to
const sendToNum = process.env.TWILIO_SEND_TO;
const sendFromNum = process.env.TWILIO_SEND_FROM;

// Specify timezone desired for date calculations
dayjs.tz.setDefault("America/Denver");

// Days to run payroll
const paydays = [1, 16];

// Debug flag
const debug = true;

// Flag to disable notifications
let payrollSubmitted = false;

setInterval(() => {
    const date = dayjs();
    if (date.hour() % 2 === 0 && date.hour() > 9 && date.hour() < 16 && !payrollSubmitted) {
        if (isPayrollDay(date)) {
            client.messages
                .create({
                    body: `It's payroll day, DON'T FORGET TO SUBMIT PAYROLL! Reply 'done' when completed to silence reminders.`,
                    from: sendFromNum,
                    to: sendToNum
                })
                .then(message => console.log(`Payroll reminder sent to ${sendToNum}`));
        }
        if (isMonday(date)) {
            client.messages
                .create({
                    body: `It's Monday, DON'T FORGET TO PAYOUT TIPS! Reply 'done' when completed to silence reminders.`,
                    from: sendFromNum,
                    to: sendToNum
                })
                .then(message => console.log(`Tipout reminder sent to ${sendToNum}`));
        }
    }
}, 3600000); // once per hour

let isMonday = (date) => {
    return date.day() === 1;
}

let isPayrollDay = (date) => {

    // New current date object
    let payDay = dayjs();

    // Count for number of valid business days found
    let validBusinessDays = 0;

    // Set payday to nearest future payday
    payDay = payDay.date(date.date() > paydays[1] ? paydays[0] : paydays[1]);

    if (debug)
        console.log(payDay.date())

    while (validBusinessDays < 2) {
        if (isHoliday(payDay) || isWeekend(payDay)) {
            // do nothing
        }
        else {
            // Valid business day found, increase count.
            validBusinessDays += 1;
            if (validBusinessDays == 2) break;
        }

        // Subtract a day from payday calculation
        payDay = payDay.date(payDay.date() - 1);

        if (debug)
            console.log(validBusinessDays + ':' + payDay.date())
    }

    return payDay.date() === date.date();

}

let isHoliday = (date) => {
    // TODO: Figure out how to list holidays
    return false;
}

let isWeekend = (date) => {
    return date.day() === 6 || date.day() === 0;
}