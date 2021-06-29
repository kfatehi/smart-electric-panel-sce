#!/usr/bin/env node
const getRate = require('./get_rate');
const fs = require('fs');
const spawn = require('child_process').spawn;

let hostport = '192.168.70.6:8086';

spawn("curl", ["-s", "-XPOST", "http://"+hostport+"/query", "--data-urlencode", "q=CREATE DATABASE studio"]).on('exit', ()=>{
  let lastTickTimestamp = Date.now();
  let ms_per_hour = 3600000;
  fs.createReadStream('/dev/ttyUSB0').on('data', (data)=>{
    if (!data) return;
    let str = data.toString()
    let phases = str.split(' ');
    if (phases.length != 2) return;
    let ts = Date.now();
    let elapsed_time_ms = ts - lastTickTimestamp;
    lastTickTimestamp = ts;
    if (elapsed_time_ms < 500) return;
    let p1 = parseInt(phases[0].trim())
    let p2 = parseInt(phases[1].trim())
    let rate_dollars_per_kwh = getRate();
    let voltage_per_phase = 120;
    phase_1_consumption_watts = p1 * voltage_per_phase;
    phase_2_consumption_watts = p2 * voltage_per_phase;
    total_consumption_watts = phase_1_consumption_watts + phase_2_consumption_watts
    total_consumption_kilowatts = total_consumption_watts / 1000;
    // divide kilowatts being used by number of millisecnods in an hour times the number of milliseconds elapsed
    total_consumption_kilowatt_hours_accrued_this_tick = ( total_consumption_kilowatts / ms_per_hour ) * elapsed_time_ms
    total_cost_accrued_this_tick = total_consumption_kilowatt_hours_accrued_this_tick * rate_dollars_per_kwh;
    let dataline=`elecmeter `
    dataline+=`duration_milliseconds=${elapsed_time_ms},`
    dataline+=`rate=${rate_dollars_per_kwh},`
    dataline+=`phase_1_current=${p1},`
    dataline+=`phase_2_current=${p2},`
    dataline+=`total_consumption_kilowatts=${total_consumption_kilowatts},`
    dataline+=`total_consumption_accrual_kilowatthours=${total_consumption_kilowatt_hours_accrued_this_tick},`
    dataline+=`total_cost_accrual_dollars=${total_cost_accrued_this_tick}`
    let tss = (ts*1000000).toString()
    dataline+=` ${tss}`;
    spawn("curl", ["-s", "-XPOST", '--connect-timeout', '1', "http://"+hostport+"/write?db=studio", "--data-binary", dataline]);
  });
});
