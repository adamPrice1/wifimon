/* Node Modules */
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const schedule = require('node-schedule');
const path = require('path');
const moment = require('moment');

const myspeed = require('./myspeed')
const fast = require('./fastSpeedtest')
const speedTest = require('./speedtestdotnet')

var app = express();


app.use(express.static(path.join(__dirname, 'wifimon/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

function removeOldTime(fname){
  let file = JSON.parse(fs.readFileSync('./wifimon/src/'+fname));

  file.forEach(function(val,index){
    if(moment(val.time).isBefore(moment().subtract(30,"days"))){
      file.splice(index,1);
    }
  })
  fs.writeFileSync('./wifimon/src/'+fname, JSON.stringify(file));
}

app.listen(process.env.PORT || 8000, function() {
  console.log("wifimon listeining on 8000");
});

schedule.scheduleJob('0 * * * *', function(){
  myspeed().then(function(result){
    let myspeeds = JSON.parse(fs.readFileSync('./wifimon/src/myspeeds.json'));
    myspeeds.push(result);
    fs.writeFileSync('./wifimon/src/myspeeds.json', JSON.stringify(myspeeds));
    console.log(result)
    fast().then(function(result){
      let fastspeeds = JSON.parse(fs.readFileSync('./wifimon/src/fastspeeds.json'));
      fastspeeds.push(result);
      fs.writeFileSync('./wifimon/src/fastspeeds.json', JSON.stringify(fastspeeds));
      console.log(result)
      speedTest().then(function(result){
        let stspeeds = JSON.parse(fs.readFileSync('./wifimon/src/stspeeds.json'));
        stspeeds.push(result);
        fs.writeFileSync('./wifimon/src/stspeeds.json', JSON.stringify(stspeeds));
        console.log(result)
      })
    });
  })

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
