const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

var express = require('express');
var app = express();

const port = new SerialPort('COM1', {
    baudRate: 1200,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: 'none'
});

const parser = port.pipe(new Readline({delimiter: '\n'}));

app.get('/getScaleApi', function (req, res) {
    var data2 = parser.read();
    data2 = parseFloat(data2);
    console.log(data2);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json(data2);
});
app.listen(3000);
