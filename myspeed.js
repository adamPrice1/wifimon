//https://github.com/emeryrose/myspeed
var Server = require('myspeed').Server;
var server = new Server({ port: 8080 });
var Client = require('myspeed').Client;
var client = new Client({ url: 'ws://127.0.0.1:8080' });
var moment = require('moment');

module.exports = async function getSpeed(){




  speeds = [];
  return new Promise(function(resolve, reject) {
    client.test(function(err, result) {
            speeds.push(result);
      client.test(function(err, result) {
                speeds.push(result);
        client.test(function(err, result) {
                    speeds.push(result);
          client.test(function(err, result) {
                        speeds.push(result);
            client.test(function(err, result) {
                            speeds.push(result);
              client.test(function(err, result) {
                                speeds.push(result);
                client.test(function(err, result) {
                                    speeds.push(result);
                  client.test(function(err, result) {
                                        speeds.push(result);
                    client.test(function(err, result) {
                                            speeds.push(result);
                      client.test(function(err, result) {
                        speeds.push(result);
                        avgUp = 0
                        avgDown = 0
                        speeds.forEach(function(speed){avgUp+=parseInt(speed.upload);avgDown+=parseInt(speed.download)});
                        if (err) {
                          reject(err);
                        } else {
                          resolve(JSON.parse(`{"upload":"${avgUp / speeds.length}","download":"${avgDown / speeds.length}","time":"${moment().format()}"}`))
                          
                          }

                      })
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })


}
