const shell = require('shelljs');
var fs = require('fs');
var express = require('express');
var app = express();

var multer = require('multer');
var upload = multer(
    { 
        limits: {
            fieldNameSize: 999999999,
            fieldSize: 999999999
        },
        dest: 'uploads/' }
    );

app.get('/', function(req, res){
    res.send(
        '<form action="/upload" method="post" enctype="multipart/form-data">'+
        '<input type="file" name="source">'+
        '<input type="submit" value="Upload">'+
        '</form>'
    );
});

app.post('/upload', upload.any(), function(req, res){

    console.log(req.files);

    var tmp_path = req.files[0].path;

    var target_path = 'uploads/' + req.files[0].originalname;

    var src = fs.createReadStream(tmp_path);

    var dest = fs.createWriteStream(target_path);
    src.pipe(dest);
	
    var exec = '../darknet/./darknet detector test ../darknet/cfg/obj.data ../darknet/cfg/yolov3-tiny.cfg ../darknet/yolov3-tiny_300000.weights uploads/' + req.files[0].originalname;
    src.on('end', function() { res.send("ok"); shell.exec(exec); shell.exec("python sendCoord.py")});
    src.on('error', function(err) { res.send({error: "upload failed"}); });
});

app.get('/info', function(req, res){
    console.log(__dirname);
    res.send("image upload server: post /upload");
});

app.listen(3000);
console.log('started server on localhost...');
