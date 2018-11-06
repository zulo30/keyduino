var ioHook = require('iohook');
var SerialPort = require("serialport");
var Readline = require('@serialport/parser-readline')
var portName = process.argv[2];
var isReady = false;

var x;
var y;

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
    // ioHook.start(true);
     ioHook.start();

}

ioHook.on('mousemove', event => {
	
	if(x !== undefined && y  !== undefined)
		selectMouseMove(x,y,event.x,event.y);
   	else{
   		x= event.x;
   		y=event.y
   	}
});

ioHook.on('keydown', event =>{
    console.log(event);
    if(isReady){
       sendKeyData("h");
    }
});

function onData(data){
	if(data == "K"){
        isReady = true;
    }
}

function onError(error) {
 console.log('Serial port error: ' + error);
}

function onClose() {
 console.log('port closed.');
}

function sendKeyData(data) {
    data = "k:" + data;
    sendData(data);
}
function sendMouseData(data) {
    data = "m:" + data;
    sendData(data);
}
function sendData(data) {
    data += "\n";
    // The message received as a String
    myport.write(data);
    console.log(" sending data ....");
     ioHook.stop();
     ioHook.start();
}

function selectMouseMove(x0,y0,x1,y1){
	var xdelta = x1 - x0;
	var ydelta = y1 - y0;
	 if( Math.abs(xdelta) > Math.abs(ydelta) ){
	 	if(xdelta>0){
	 		sendMouseData("r");
	 	}
	 	else{
	 		sendMouseData("l");
	 	}
	 }
	 else{
	 	if(ydelta>0){
	 		sendMouseData("d");
	 	}
	 	else{
	 		sendMouseData("u");
	 	}
	 }


}




