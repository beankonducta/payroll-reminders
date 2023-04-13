// Methods to test
const index = require('./index')

// dayjs stuff
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc);
dayjs.extend(timezone);

// NOTE: Date objects months are zero indexed!

// test('gets todays date from datejs', () => {
//     expect(dayjs().isValid()).toBeTruthy();
// });

// test('tests if isBillPayDay on 5/26/2022, which should be true', () => {
//     const date = dayjs(new Date(2021, 4, 26));
//     expect(index.isBillPayDay(date)).toBeTruthy();
// });

// test('tests isMonday on 5/10/2021, which is a monday', () => {
//     const date = dayjs(new Date(2021, 4, 10));
//     expect(index.isMonday(date)).toBeTruthy();
// });

// test('tests isMonday on 5/13/2021, which is a wednesday', () => {
//     const date = dayjs(new Date(2021, 4, 13));
//     expect(index.isMonday(date)).toBeFalsy();
// });

// test('tests isFriday on 5/7/2021, which is a friday', () => {
//     const date = dayjs(new Date(2021, 4, 7));
//     expect(index.isFriday(date)).toBeTruthy();
// });

// test('tests isFriday on 5/10/2021, which is a monday', () => {
//     const date = dayjs(new Date(2021, 4, 10));
//     expect(index.isFriday(date)).toBeFalsy();
// });

// test('tests isWeekend on 5/9/2021, which is a sunday', () => {
//     const date = dayjs(new Date(2021, 4, 9));
//     expect(index.isWeekend(date)).toBeTruthy();
// });

// test('tests isWeekend on 5/29/2021, which is a saturday', () => {
//     const date = dayjs(new Date(2021, 4, 29));
//     expect(index.isWeekend(date)).toBeTruthy();
// });

// test('tests isWeekend on 5/6/2021, which is a thursday', () => {
//     const date = dayjs(new Date(2021, 4, 6));
//     expect(index.isWeekend(date)).toBeFalsy();
// });

// test('tests isHoliday on 4/4/2023, which is not a holiday', () => {
//     const date = dayjs(new Date(2023, 3, 4));
//     expect(index.isHoliday(date)).toBeFalsy();
// });

// test('tests isHoliday on 9/4/2023, which is Labor day', () => {
//     const date = dayjs(new Date(2023, 8, 4));
//     expect(index.isHoliday(date)).toBeTruthy();
// });

// test('tests isHoliday on 7/24/2021, which is Pioneer day', () => {
//     const date = dayjs(new Date(2021, 6, 24));
//     expect(index.isHoliday(date)).toBeTruthy();
// });

// 2023 payroll days

test('tests isPayrollDay on 1/12/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 0, 12));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 1/31/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 0, 31));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 2/15/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 1, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 2/28/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 1, 28));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 3/15/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 2, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 3/30/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 2, 30));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 4/13/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 3, 13));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 4/28/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 3, 28));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 5/15/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 4, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 5/31/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 4, 31));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 6/15/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 5, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 6/29/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 5, 29));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 7/13/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 6, 13));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 7/31/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 6, 31));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 8/15/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 7, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 8/31/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 7, 31));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 9/14/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 8, 14));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 9/28/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 8, 28));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 10/13/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 9, 13));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 10/30/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 9, 30));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 11/15/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 10, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 11/30/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 10, 30));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 12/14/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 11, 14));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 12/29/2023, which is Payroll day', () => {
    const date = dayjs(new Date(2023, 11, 28));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

// 2024 dates

test('tests isPayrollDay on 1/12/2024, which is Payroll day', () => {
    const date = dayjs(new Date(2024, 0, 12));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 1/31/2024, which is Payroll day', () => {
    const date = dayjs(new Date(2024, 0, 31));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 2/15/2024, which is Payroll day', () => {
    const date = dayjs(new Date(2024, 1, 15));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

test('tests isPayrollDay on 2/29/2024, which is Payroll day', () => {
    const date = dayjs(new Date(2024, 1, 29));
    expect(index.isPayrollDay(date)).toBeTruthy();
});

// THESE ARE OLD PAYROLL DAYS, ASSUMING WE HAVE SINGLE DAY PROCESSING. WE NOW HAVE TWO (IN THEORY)


// test('tests isPayrollDay on 5/13/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 4, 13));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 5/28/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 4, 28));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 6/15/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 5, 15));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 6/30/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 5, 30));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 7/15/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 6, 15));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 7/29/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 6, 29));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 8/13/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 7, 13));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 8/31/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 7, 31));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 9/15/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 8, 15));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 9/30/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 8, 30));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 10/14/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 9, 14));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 10/29/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 9, 29));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 11/15/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 10, 15));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 11/30/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 10, 30));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 12/15/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 11, 15));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });

// test('tests isPayrollDay on 12/29/2021, which is Payroll day', () => {
//     const date = dayjs(new Date(2021, 11, 29));
//     expect(index.isPayrollDay(date)).toBeTruthy();
// });