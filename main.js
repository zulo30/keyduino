const ioHook = require('iohook');
var SerialPort = require("serialport");
var Readline = require('@serialport/parser-readline')
var portName = process.argv[2];

var myport = new SerialPort(portName,{
	baudRate:9600
})
var parser = myport.pipe(new Readline({ delimiter: '\n' }))

myport.on("open",onOpen);
myport.on("data",onData);
myport.on("error",onError);
myport.on("close",onClose);


function onOpen(){
	console.log("Open new connection");
    sendData("hola");
}


// ioHook.on('mousemove', event => {
// 	console.log(event);
//     sendData("h");
// });

ioHook.on('keydown', event =>{
    console.log(event);
    // sendData('H');
 });

function onData(data){
	console.log("data: " + data);
}

function startSending() {

}

function sendData(data){
	 console.log("llego");
    // Sending String character by character
    for(var i=0; i<data.length; i++){
        myport.write(data);
    }

    // Sending the terminate character
    myport.write('\n');
}
function onError(error) {
   console.log('Serial port error: ' + error);
}

function onClose() {
   console.log('port closed.');
}


function sendData(data) {
    // The message received as a String
    console.log(data);
    // Sending String character by character
    for(var i=0; i<data.length; i++){
        myport.write(Buffer.from(data), function(err, results) {
            // console.log('Error: ' + err);
            // console.log('Results ' + results);
        });
    }
    // Sending the terminate character
    myport.write(Buffer.from("/n"), function(err, results) {
        // console.log('err ' + err);
        // console.log('results ' + results);
    });
}
// Register and start hook

    ioHook.start();

