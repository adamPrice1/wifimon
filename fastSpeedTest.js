//https://github.com/branchard/fast-speedtest-api
const FastSpeedtest = require("fast-speedtest-api");
var moment = require('moment');

module.exports = async function getSpeed(){

  speeds = [];
  return new Promise(function(resolve, reject) {
    let speedtest = new FastSpeedtest({
    token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm", // required
    verbose: true, // default: false
    timeout: 10000, // default: 5000
    https: true, // default: true
    urlCount: 10, // default: 5
    bufferSize: 10, // default: 8
    unit: FastSpeedtest.UNITS.Mbps // default: Bps
  });
  speeds = []
  speedtest.getSpeed().then(s => {
    speeds.push(s)
    speedtest.getSpeed().then(s => {
      speeds.push(s)
      speedtest.getSpeed().then(s => {
        speeds.push(s)
        speedtest.getSpeed().then(s => {
          speeds.push(s)
          speedtest.getSpeed().then(s => {
            speeds.push(s)
            avgDownload = 0
            speeds.forEach(function(speed){avgDownload += parseInt(speed);});
            resolve(JSON.parse(`{"download": "${avgDownload / speeds.length}","time":"${moment().format()}"}`));
          }).catch(e => {
            console.error(e.message);
          });
        })
      })
    })
  })
  })


}
