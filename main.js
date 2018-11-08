"use strict";

var ioHook = require('iohook');
var SerialPort = require("serialport");
var Readline = require('@serialport/parser-readline')
var portName = process.argv[2];
var ready = true;
var keyboard = require('./keyboardmap.js');


var x;
var y;

var mouseCount=0;

var myport = new SerialPort(portName,{
	baudRate:9600
})
var parser = myport.pipe(new Readline({ delimiter: '\n' }))


//events emitters 
myport.on("open",onOpen);
myport.on("data",onData);
myport.on("error",onError);
//myport.on("close",onClose);

ioHook.on('mousemove', e => {
    if(mouseCount == 15){
    	var bool = isReadyToSend();
    	if(x !== undefined && y  !== undefined)
			selectMouseMove(x,y,e.x,e.y);
	   	else{
	   		x = e.x;
	   		y = e.y;
	   	}
	   	mouseCount = 0;
	}
	mouseCount++;	
});

ioHook.on('keydown', event =>{
    console.log(event);
    var bool = isReadyToSend();
    if( bool ){
    	 var key = keyboard[event.keycode];
       console.log(key);
       sendKeyData(key);
    }
});

 function isReadyToSend(){
	if(ready){
		ready = false;
		return true;
	} 
	else{
		return false;
	}
}


// functions 
function onOpen(){
    console.log("Open new connection");
    // ioHook.start(true);
     
}

function onData(data){
	if(data == "K"){

        ready = true;
    }
    else{
    	console.log("this"+data);
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
	 x = x1;
	 y = y1;
}

ioHook.start(true);



