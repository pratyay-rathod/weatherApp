const http = require("http");
const fs = require("fs");
const requests = require("requests");

const allowCrossDomain = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  };
  
const server = http.createServer(function(req, res) {
  allowCrossDomain(req, res, function() {

              if(req.url=="/"){
                  requests('https://api.openweathermap.org/data/2.5/weather?lat=23.0972159&lon=72.546466&appid=724289f14343ce1e188e979a5ec3d139')
                      .on('data', function (data) {
                          res.end(data)                
                      })
                      .on('end', function (err) {
                      if (err) return console.log('connection closed due to errors', err);
                      
                      console.log('end');
                      });
              }
    });
});

server.listen(8000,'127.0.0.1',()=>{
    console.log("listening to 8000");
});

fs.readFile("../src/Components/Weather.js","utf-8",(error,res)=>{
    if(!error){
        console.log(res);
    }
    else{
        console.log(error);
    }
});