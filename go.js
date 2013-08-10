var express = require('express');
var engines = require('consolidate');
var nodecr = require('nodecr');
var fs = require('fs');
var app = express();

app.engine('html', engines.hogan);
app.set('view engine', 'html');
app.set('views', __dirname);

var lastPng;

app.get('/', function(req, res)
{
  res.render('index');
});

app.get('/image', function(req, res)
{
  if(lastPng)
  {
    res.writeHead(200, {'Content-Type:': 'image/png' });
    res.end(lastPng);
  }
});

var arDrone = require('ar-drone');
var client = arDrone.createClient();

//client.takeoff();
/*client.after(5000, function()
{
  var pngEncoder = client.getPngStream();
  pngEncoder
  .on('error', console.log)
  .on('data', function(pngBugger)
  {
    lastPng = pngBuffer;
  });
});
*/
/*client
  .after(5000, function() {
    this.clockwise(0.5);
  })
  //.after(3000, function() {
  //  this.animate('flipLeft', 15);
  //})
  .after(1000, function() {
    this.stop();
    this.land();
  });
*/

nodecr.process(__dirname + '/stop.png', function(err, text)
{
  if(err)
  {
     console.error(err);
  }else{
     console.log("OCR Text: " + text);
  }
});

//app.listen(8080);
