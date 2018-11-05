const ioHook = require('iohook');
var SerialPort = require("serialport");
var Readline = require('@serialport/parser-readline')
var portName = process.argv[2];

var myport = new SerialPort(portName,{
	baudRate:9600
})
var parser = myport.pipe(new Readline({ delimiter: '\r\n' }))

myport.on("open",onOpen);
myport.on("data",startSending);




function onOpen(){
	console.log("Open new connection");
}


// ioHook.on('mousemove', event => {
// 	console.log(event.type);
// 	console.log(event.x);
//   	setTimeout(function(){ console.log(event);},30000);
//   	sendData(event.x);
// });

function onData(data){
	console.log("data: " + data);
}

function startSending() {
	ioHook.start();
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
// Register and start hook



