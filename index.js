var nc = require('ar-drone');
var client = nc.createClient();
//client.on('navdata', console.log);
var fs = require('fs');

var http = require("http"), drone = require("dronestream");
a = client.getPngStream();
a.on('data', function (data) {
    var buf = new Buffer(data);

    var filename = new Date() * 1 + '.png';
    fs.open(filename, "wx", function (err, fd) {
        fs.write(fd, buf, 0, buf.length,null, function () {
            console.log('Written Data');
            fs.close(fd);
        });
    });

});

//var server = http.createServer(function(req, res) {
//  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
//});
//
//drone.listen(server);
//server.listen(5555);

//console.log('Taking off');
//client
//  .after(8000, function() {
//    this.clockwise(10);
//  })
//  .after(20000, function() {
//    this.stop();
//    this.land();
//  });

//setTimeout(function(){client.land();}, 5000)