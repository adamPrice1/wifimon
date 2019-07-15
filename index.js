/* Node Modules */
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const path = require('path');
const moment = require('moment');

const myspeed = require('./myspeed')
const fast = require('./fastSpeedTest')
const speedTest = require('./speedtestdotnet')

var app = express();


app.use(express.static(path.join(__dirname, 'wifimon/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

function removeOldTime(fname){
  let file = JSON.parse(fs.readFileSync('./wifimon/build/'+fname));

  file.forEach(function(val,index){
    if(moment(val.time).isBefore(moment().subtract(30,"days"))){
      file.splice(index,1);
    }
  })
  fs.writeFileSync('./wifimon/build/'+fname, JSON.stringify(file));
}

app.listen(process.env.PORT || 8000, function() {
  console.log("wifimon listening on 8000");
});

schedule.scheduleJob('0 * * * *', function(){
  myspeed().then(function(result){
    let myspeeds = JSON.parse(fs.readFileSync('./wifimon/build/myspeeds.json'));
    myspeeds.push(result);
    fs.writeFileSync('./wifimon/build/myspeeds.json', JSON.stringify(myspeeds));
    console.log(result)

      speedTest().then(function(result){
        let stspeeds = JSON.parse(fs.readFileSync('./wifimon/build/stspeeds.json'));
        stspeeds.push(result);
        fs.writeFileSync('./wifimon/build/stspeeds.json', JSON.stringify(stspeeds));
        console.log(result)
      })
      .catch((err) => {
        console.log(err)
      });
    })
    .catch((err) => {
      console.log(err)
    });
  });

schedule.scheduleJob('0 * * *', function(){
  removeOldTime("myspeeds.json");
  removeOldTime("fastspeeds.json");
  removeOldTime("stspeeds.json");
  console.log("fuckin removed old speeds ey")
});

app.get('/',function(req,res){
  res.sendFile('index.html', { root: __dirname + "/wifimon/build" });
});
