//https://github.com/Yellowiki/speedtest-promise
const { testSpeed } = require('speedtest-promise')
var moment = require('moment');

module.exports = async function getSpeed(){

  speeds = [];

  return new Promise(function(resolve, reject) {

    testSpeed().then(s => {
      speeds.push(s)
      testSpeed().then(s => {
        speeds.push(s)
        testSpeed().then(s => {
          speeds.push(s)
          testSpeed().then(s => {
            speeds.push(s)
            testSpeed().then(s => {
              speeds.push(s)
              avgDownload = 0
              avgUpload = 0
              avgPing = 0
              speeds.forEach(function(speed){
                avgDownload += parseInt(speed.speeds.download);
                avgUpload += parseInt(speed.speeds.upload);
                avgPing += parseInt(speed.ping);
              });
              resolve(JSON.parse(`{"download":"${avgDownload / speeds.length}","upload":"${avgUpload / speeds.length}","ping":"${avgPing / speeds.length}","time":"${moment().format()}"}`))
            })
          })
        })
      })
    })


  })


}
