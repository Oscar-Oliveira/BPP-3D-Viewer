"use strict"

var demoJson = `{ "box" : [
{ "w":15, "h":25, "d":15, "tl":15.25, "f":1, "items": [
 { "i":0, "w":10, "h":7, "d":3, "x":0, "y":0, "z":0, "r":1 },
 { "i":1, "w":2, "h":7, "d":3, "x":0, "y":0, "z":3, "r":0 }
]},
{ "w":20, "h":15 , "d":15, "tl":25.25, "f":2, "items": [
 { "i":0, "w":10, "h":7, "d":3, "x":0, "y":0, "z":0, "r":1 },
 { "i":1, "w":2, "h":7, "d":3, "x":0, "y":0, "z":3, "r":0 },
 { "i":2, "w":2, "h":7, "d":3, "x":0, "y":0, "z":6, "r":0 },
 { "i":3, "w":2, "h":7, "d":3, "x":0, "y":0, "z":9, "r":0 },
 { "i":4, "w":2, "h":7, "d":3, "x":0, "y":0, "z":12, "r":0 } 
]},
{ "w":2000, "h":1000, "d":1000, "tl":35.25, "f":3, "items": [
 { "i":0, "w":1000, "h":700, "d":300, "x":0, "y":0, "z":0, "r":1 },
 { "i":1, "w":200, "h":700, "d":300, "x":0, "y":0, "z":300, "r":0 },
 { "i":2, "w":200, "h":1000, "d":1000, "x":1500, "y":0, "z":0, "r":0 }
]},
{ "w":100, "h":100, "d":200, "tl":0, "f":10, "items": [ ] } 
]}`;

var qs = getQueryString('demo');
if (qs != null) { DEMO = (qs == "true") ? true : false; }

if (DEMO) {
    handleFileSelectMSG(false, "DEMO AVAILABLE");
    document.getElementById('drop-zone').onclick = clickToDemo;    
}

function clickToDemo() {
    handleFileSelectMSG(true, "DEMO");    
    InitNewProblem(demoJson);    
}