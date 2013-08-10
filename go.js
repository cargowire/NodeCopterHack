var express = require('express');
var engines = require('consolidate');
var nodecr = require('nodecr');
var drone = require('dronestream');
var fs = require('fs');
var app = express();
app.engine('html', engines.hogan);
app.set('view engine', 'html');
app.set('views', __dirname);

var lastPng;

app.get('/', function (req, res) {
    res.render('index');
});

app.get('/image', function (req, res) {
    if(lastPng) {
        //console.log('has last png');
        res.writeHead(200, {'Content-Type:': 'image/png' });
        res.end(lastPng);
    }
});

var arDrone = require('ar-drone');
var client = arDrone.createClient();
var pngStream;

//client.takeoff();
client.after(2000, function () {
    pngStream = client.getPngStream();
    pngStream.on('error', console.log).on('data', function (pngBuffer) {
        ;
        lastPng = pngBuffer;

        var filename = new Date() * 1 + '.png';
        fs.open(filename, "wx", function (err, fd) {
            fs.write(fd, pngBuffer, 0, pngBuffer.length, null, function () {
                fs.close(fd, function () {
                    scan(filename);

                });
            });
        });

    });
});

var takeoff = function () {
    client.takeoff();
};

var scanning = false;
var scan = function (filename) {
    if(!scanning) {
        scanning = true;
        nodecr.process(__dirname + '/' + filename, function (err, text)
            //nodecr.process(lastPng, function(err, text)
        {
            if(err) {
                //    console.error(err);
            } else {
                var tidiedUp = text.replace("0", "O").replace(/\W/g, "");
                // if(tidiedUp == "STOP")
                //{
                console.log(tidiedUp);
                doAction(tidiedUp);

                // }
            }
        });
        scanning = false;
    }
};

app.listen(8076);

var doAction = function (command) {

    var commands = {
        'LAND': function () {
            client.land();
        },
        'TAKEOFF': function () {
            client.takeoff();
        }
    }

    var upper = command.toUpperCase();
    if(typeof commands[upper] == 'function') {
        commands[upper];
    }

}
takeoff();


