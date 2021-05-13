var dotenv = require('dotenv').config()

// Server stuff
const express = require('express');
const bodyParser = require('body-parser');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

// Init express
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// dayjs stuff
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);

// Twilio stuff
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
let disableNotifications = false;

// Server
var server = app.listen(4567, function () {
    console.log('Listening on port %d', server.address().port);
});

// Handle responses
app.post('/message', function (req, res) {
    let resp = new MessagingResponse();
    if (req.body.Body.toLowerCase().includes('done')) {
        disableNotifications = true;
        console.log(req.body.Body);
        resp.message('Thanks for completing payroll :)');
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(resp.toString());
    }
});

// The job that checks once an hour if it should send a text
setInterval(() => {
    const date = dayjs();

    // Resets notifications
    if(date.hour > 16) disableNotifications = false;

    if (date.hour() % 2 === 0 && date.hour() > 9 && date.hour() < 16 && !disableNotifications) {
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
}, 10000); // Once per hour

let isMonday = (date) => {

    // date.day() returns 0-6 (Sun to Sat), making 1 = Monday
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

    // Payroll takes two business days (one to submit, one to receive)
    while (validBusinessDays < 2) {
        if (isHoliday(payDay) || isWeekend(payDay)) {
            // do nothing
        }
        else {
            // Valid business day found, increase count
            validBusinessDays += 1;

            // Break the loop
            if (validBusinessDays == 2) break;
        }

        // Subtract a day from payday calculation
        payDay = payDay.date(payDay.date() - 1);

        if (debug)
            console.log(validBusinessDays + ':' + payDay.date())
    }

    // Returns whether the calculated pay date is equal to today's date
    return payDay.date() === date.date();

}

let isHoliday = (date) => {
    // TODO: Figure out how to list holidays
    return false;
}

let isWeekend = (date) => {
    return date.day() === 6 || date.day() === 0;
}