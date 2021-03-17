// handle offline situation by remmebering the dataline 
//

const fs = require('fs');

let data = [];

// Accepts
//  - a proc to check for exit status
//  - dataline influxdb format with timestamp
//  - a function that accepts array of datalines on reconnect
module.exports.wrap = (proc, dataline, onReconnect)=>{
  proc.on('exit', (code) => {
    if (code == 0) {
      if (data.length > 0) {
        onReconnect(data)
        data = [];
      }
    } else {
      data.push(dataline);
    };
  });
};
