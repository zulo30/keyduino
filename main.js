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
	if(data == "K"){
        sendData("Mateo Zuluaga");
    }
}

function onError(error) {
 console.log('Serial port error: ' + error);
}

function onClose() {
 console.log('port closed.');
}


function sendData(data) {
    data += "\n";
    // The message received as a String
    console.log(" sending data ....");
    myport.write(data);
}
// Register and start hook

ioHook.start();

