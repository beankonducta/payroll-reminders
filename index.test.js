// Methods to test
const index = require('./index')

// dayjs stuff
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);

// NOTE: Date objects months are zero indexed!

test('gets todays date from datejs', () => {
    expect(dayjs().isValid()).toBeTruthy();
});

test('tests isMonday on 5/10/2021, which is a monday', () => {
    const date = dayjs(new Date(2021, 4, 10));
    expect(index.isMonday(date)).toBeTruthy();
});

test('tests isMonday on 5/13/2021, which is a wednesday', () => {
    const date = dayjs(new Date(2021, 4, 13));
    expect(index.isMonday(date)).toBeFalsy();
});

test('tests isWeekend on 5/9/2021, which is a sunday', () => {
    const date = dayjs(new Date(2021, 4, 9));
    expect(index.isWeekend(date)).toBeTruthy();
});

test('tests isWeekend on 5/8/2021, which is a saturday', () => {
    const date = dayjs(new Date(2021, 4, 8));
    expect(index.isWeekend(date)).toBeTruthy();
});

test('tests isWeekend on 5/6/2021, which is a thursday', () => {
    const date = dayjs(new Date(2021, 4, 6));
    expect(index.isWeekend(date)).toBeFalsy();
});

test('tests isHoliday on 5/15/2021, which is not a holiday', () => {
    const date = dayjs(new Date(2021, 4, 15));
    expect(index.isHoliday(date)).toBeFalsy();
});

test('tests isHoliday on 5/31/2021, which is Memorial day', () => {
    const date = dayjs(new Date(2021, 4, 31));
    expect(index.isHoliday(date)).toBeTruthy();
});

test('tests isHoliday on 7/24/2021, which is Pioneer day', () => {
    const date = dayjs(new Date(2021, 6, 24));
    expect(index.isHoliday(date)).toBeTruthy();
});