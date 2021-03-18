// handle offline situation by remmebering the dataline 
//

const fs = require('fs');

let data = [];

module.exports.wrap = proc => dataline => {
  proc(dataline).on('exit', (code) => {
    if (code == 0) {
      if (data.length > 0) {
        onReconnect(data)
        data = [];
        console.log("reconnected. "+data.length+" datalines deferred");
      }
    } else {
      data.push(dataline);
    };
  });
};


module.exports.startServer = ()=>{
  const app = require('express')();

  app.get('/', (req, res)=>{
    res.json({
      datalines: data.length
    });
  });
  
  app.listen(3000, ()=>{
    console.log("listening");
  });
}
