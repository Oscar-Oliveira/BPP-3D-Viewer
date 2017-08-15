"use strict"

var drop_zone_text_ok = "Drop File Here";
var drop_zone_text_error = "Drop JSON file";
 
document.getElementById('drop-zone-file').textContent = drop_zone_text_ok;
 
var dropZone = document.getElementById('drop-zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files; 
    if (files.length == 1) {
        var file = files[0]; 
        var ext = (/[.]/.exec(file.name)) ? /[^.]+$/.exec(file.name) : undefined;         
        if (ext == "json" ) {        
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onloadend = function(e) {               
                InitNewProblem(reader.result);                
                handleFileSelectMSG(true, file.name);  
            };
        } else { handleFileSelectMSG(false, drop_zone_text_error); }
    }
    else { handleFileSelectMSG(false, drop_zone_text_error); }
}
 
function handleFileSelectMSG(flag, text) { 
    document.getElementById('drop-zone-file').className = flag ? "drop-zone-ok" : "drop-zone-error";
    document.getElementById('drop-zone-file').textContent = text;   
}
 
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; 
    handleFileSelectMSG(true, drop_zone_text_ok);
}
 
var schema = { 
    "type": "object", 
    "required": [ "box" ], 
    "properties": {
        "box": { 
            "description": "Bin", 
            "type": "array", 
            "title": "box", 
            "items": {
                "type": "object", 
                "required": [ "w", "h", "d", "tl", "f", "items"], 
                "properties": {
                    "w": { "description": "Width", "type": "number" }, 
                    "h": { "description": "Height", "type": "number" }, 
                    "d": { "description": "Depth", "type": "number" }, 
                    "tl": { "description": "Trim loss","type": "number" }, 
                    "f": { "description": "frequency", "type": "number" }, 
                    "items": { 
                        "description": "Items in bin", 
                        "type": "array", 
                        "title": "items", 
                        "items": { 
                            "type": "object", 
                            "required": [ "i", "w", "h", "d", "x", "y", "z", "r" ], 
                            "properties": { 
                                "i": { "description": "Identifier", "type": "number" }, 
                                "w": { "description": "Width","type": "number" }, 
                                "h": { "description": "Height","type": "number" }, 
                                "d": { "description": "Depth","type": "number" }, 
                                "x": { "description": "Pos.X","type": "number" }, 
                                "y": { "description": "Pos.Y","type": "number" }, 
                                "z": { "description": "Pos.Z","type": "number" }, 
                                "r": { "description": "Rotated flag","type": "number" } 
                            } 
                        } 
                    } 
                } 
            } 
        } 
    } 
};

var schemaHTML = `{ "type": "object", 
    "required": [ "box" ], 
    "properties": {
        "box": { 
            "description": "Bin", 
            "type": "array", 
            "title": "box", 
            "items": {
                "type": "object", 
                "required": [ "w", "h", "d", "tl", "f", "items"], 
                "properties": {
                    "w": { "description": "Width", "type": "number" }, 
                    "h": { "description": "Height", "type": "number" }, 
                    "d": { "description": "Depth", "type": "number" }, 
                    "tl": { "description": "Trim loss","type": "number" }, 
                    "f": { "description": "frequency", "type": "number" }, 
                    "items": { 
                        "description": "Items in bin", 
                        "type": "array", 
                        "title": "items", 
                        "items": { 
                            "type": "object", 
                            "required": [ "i", "w", "h", "d", "x", "y", "z", "r" ], 
                            "properties": { 
                                "i": { "description": "Identifier", "type": "number" }, 
                                "w": { "description": "Width","type": "number" }, 
                                "h": { "description": "Height","type": "number" }, 
                                "d": { "description": "Depth","type": "number" }, 
                                "x": { "description": "Pos. X","type": "number" }, 
                                "y": { "description": "Pos. Y","type": "number" }, 
                                "z": { "description": "Pos. Z","type": "number" }, 
                                "r": { "description": "Rotated flag (0 -  false)","type": "number" } 
                            } 
                        } 
                    } 
                } 
            } 
        } 
    } 
}`

function DownloadSchema() {
    var textToWrite = schemaHTML;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
    var fileNameToSaveAs = "schema.json";
 
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.URL != null) {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    } else {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}

function InitNewProblem(text) {    
    if (validadeJSON) {        
        var error = false;        
        try { Boxes = JSON.parse(text); } 
        catch(e) { 
            handleFileSelectMSG(false, "JSON PARSE ERROR");
            console.error(e.message); 
            error = true;
        }     
        if (!error) {        
            require(["dojox/json/schema"], function () {
                var result = dojox.json.schema.validate(Boxes, schema);
                if (!result.valid)  {
                    console.error("property : " + result.errors[0].property + "\nmessage :  "+ result.errors[0].message);handleFileSelectMSG(false, "JSON PARSE ERROR");
                } else { DrawNewProblem(); }                 
            });
        }
    } else {
        Boxes = JSON.parse(text);
        DrawNewProblem()
    }
}

function DrawNewProblem() {
    boxIndex = 0;
    itemStopIndex = 0;
    CreateMenu();
    drawScene();
}