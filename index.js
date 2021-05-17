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

// Date-holidays stuff
const Holidays = require('date-holidays')
const hd = new Holidays("US", "ut")

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
const debug = false;

// Flag to disable notifications
let disableNotifications = false;

const port = process.env.PORT || 80;

// Server
var server = app.listen(port, function () {
    console.log('Listening on port %d', server.address().port);
    
    // Startup run
    runNotification();
});

// Handle responses
app.post('/message', function (req, res) {
    console.log(req.body.Body);
    let resp = new MessagingResponse();
    if (req.body.Body.toLowerCase().includes('done') && !disableNotifications) {
        disableNotifications = true;
        console.log('disabling notifications');
        resp.message('Thanks for completing payroll :)');
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(resp.toString());
    }
    if (req.body.Body.toLowerCase().includes('ping')) {
        resp.message(`I'm still alive! Notifications are currently ${disableNotifications ? 'disabled.' : 'enabled.'} Today is ${isPayrollDay(dayjs()) ? '' : 'not'} payroll day. Today is ${isMonday(dayjs()) ? '' : 'not'} monday & today is ${isHoliday(dayjs()) ? '' : 'not'} a holiday.`);
        res.writeHead(200, {
            'Content-Type': 'text/xml'
        });
        res.end(resp.toString());
    }
});

// The job that checks once an hour if it should send a text
setInterval(() => {
    runNotification();
}, 36000); // Once per hour

const runNotification = () => {
    const date = dayjs();

    // I don't know if this is reliable, don't know if the Heroku server changes
    const herokuOffset = 5;

    // Resets notifications
    if (+date.hour() > 16 + herokuOffset) disableNotifications = false;

    if (+date.hour() > 9 + herokuOffset && !disableNotifications) {
        console.log('running');
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
}

const isMonday = (date) => {
    // date.day() returns 0-6 (Sun to Sat), making 1 = Monday
    return date.day() === 1;
}

const isPayrollDay = (date) => {

    // New current date object
    let payDay = date.clone();

    // Count for number of valid business days found
    let validBusinessDays = 0;

    // Set payday to nearest future payday
    payDay = payDay.date(date.date() > paydays[1] ? paydays[0] : paydays[1]);

    // If it's the beginning payday of the month we need to increase month by 1
    if (payDay.date() === paydays[0]) payDay = payDay.month(payDay.month() + 1);

    if (debug)
        console.log(payDay.date())

    // Payroll takes two business days (one to submit, one to receive)
    while (validBusinessDays < 2) {
        if (isHoliday(payDay) || isWeekend(payDay)) {
            if (debug)
                console.log('invalid day: ' + payDay.format())
        } else {
            // Valid business day found, increase count
            validBusinessDays += 1;

            if (debug)
                console.log('valid day: ' + payDay.format())

            // Break the loop
            if (validBusinessDays === 2) break;
        }

        // Subtract a day from payday calculation
        payDay = payDay.date(payDay.date() - 1);

        if (debug)
            console.log(validBusinessDays + ':' + payDay.date())
    }

    // Returns whether the calculated pay date is equal to today's date
    return payDay.date() === date.date();

}

const isHoliday = (date) => {
    for (holiday of hd.getHolidays(date.year()))
        if (holiday.date.slice(0, 10) == date.format().slice(0, 10)) return true;
    return false;
}

const isWeekend = (date) => {
    return date.day() === 6 || date.day() === 0;
}

// exports for testing
exports.isHoliday = isHoliday;
exports.isWeekend = isWeekend;
exports.isMonday = isMonday;
exports.isPayrollDay = isPayrollDay;