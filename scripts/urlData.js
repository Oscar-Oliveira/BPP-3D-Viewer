"use strict"

var qs = getQueryString('data');
var s;

if (qs != null) {    
    handleFileSelectMSG(false, "URL DATA AVAILABLE");
    s = decodeURIComponent(qs);
    document.getElementById('drop-zone').onclick = clickToParseData;
}

function clickToParseData() {
    handleFileSelectMSG(true, "URL DATA");    
    InitNewProblem(s);    
}