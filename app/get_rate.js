#!/usr/bin/env node
const TOU_D_A = {
  summer: {
    months: [6, 7, 8, 9], // June to September (4 months)
    weekdays: [
      { hours: [8, 9, 10, 11, 12, 13], rate: 0.28 }, // 8 AM to 2 PM
      { hours: [14, 15, 16, 17, 18, 19], rate: 0.48 }, // 2 PM to 8 PM
      { hours: [20, 21], rate: 0.28 }, // 8 PM to 10 PM
      { hours: [22, 23, 23, 0, 1, 2, 3, 4, 5, 6, 7], rate: 0.12 }, // 10 PM to 8 AM
    ],
    weekends: [
      { hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], rate: 0.28 }, // 8 AM to 10 PM
      { hours: [22, 23, 0, 1, 2, 3, 4, 5, 6, 7], rate: 0.12 }, // 10 PM to 8 AM
    ]
  },
  winter: {
    months: [10, 11, 12, 1, 2, 3, 4, 5], // October to May (8 months)
    weekdays: [
      { hours: [8, 9, 10, 11, 12, 13], rate: 0.27 }, // 8 AM to 2 PM
      { hours: [14, 15, 16, 17, 18, 19], rate: 0.36 }, // 2 PM to 8 PM
      { hours: [20, 21], rate: 0.27 }, // 8 PM to 10 PM
      { hours: [22, 23, 23, 0, 1, 2, 3, 4, 5, 6, 7], rate: 0.13 }, // 10 PM to 8 AM
    ],
    weekends: [
      { hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21], rate: 0.27 }, // 8 AM to 10 PM
      { hours: [22, 23, 0, 1, 2, 3, 4, 5, 6, 7], rate: 0.13 }, // 10 PM to 8 AM
    ]
  }
}
function getRate(date) {
  date = date || new Date();
  // is it summer or winter?
  let month = date.getMonth()+1;
  let isSummer = TOU_D_A.summer.months.find(i=>month === i);
  let seasonRates = isSummer ? TOU_D_A.summer : TOU_D_A.winter;
  // is it weekday or weekend?
  let day = date.getDay();
  let isWeekend = (day == 6) || (day == 0);    // 6 = Saturday, 0 = Sunday
  let dayRates = isWeekend ? seasonRates.weekends : seasonRates.weekdays;
  // which hour is it?
  let hour = date.getHours();
  for (let tou of dayRates) {
    let block = tou.hours.find(i=>i===hour)
    if (block !== undefined) {
      return tou.rate;
    }
  }
}

module.exports = getRate;