"use strict"

function CreateMenu() {
    if (boxIndex == -1) { return; }    
    var b = document.getElementById('box-list');
    var i=0;
    while (true) {
        var x = document.getElementById(i++);
        if (x) { b.removeChild(x); }
        else { break; }
    }    
    var myNode = document.getElementById("box-items");
    while (myNode.firstChild) { myNode.removeChild(myNode.firstChild); }    
    for (i=0; i < Boxes.box.length; ++i) {
        document.getElementById('box-list').appendChild( CreateBoxMenu(i, Boxes.box[i]) );            
        if (i == boxIndex) { CreateItemsMenu(Boxes.box[i].items); }
    }  
}

function doP(text, className) {            
    var element = document.createElement('p');
    element.textContent = text;
    element.className = className;            
    return element;
}

function doPre(text, className) {            
    var element = document.createElement('pre');
    element.textContent = text;
    element.className = className;            
    return element;
}

function doA(text, className) {            
    var element = document.createElement('a');
    element.textContent = text;
    element.href = text;
    element.className = className;            
    return element;
}

function CreateBoxMenu(index, box) {
    var iDiv = document.createElement('div');
    iDiv.id = index;    
    iDiv.className = index == boxIndex ? 'box box1' : 'box box0';
    var iDiv2 = document.createElement('div');    
    iDiv2.className = index == boxIndex ? 'boxInfo itemInfo' : 'boxInfo';    
    var text = "Bin " + index;
    iDiv2.appendChild( doP(text, 'boxTitle') );
    text =  'Size: ' + box.w + "x" + box.h + "x" + box.d;         
    iDiv2.appendChild( doP( text, 'boxText') );
    text = 'Trim loss: ' + box.tl; 
    iDiv2.appendChild( doP(text, 'boxText') );
    text = 'Frequency: ' + box.f; 
    iDiv2.appendChild( doP(text, 'boxText') ); 
    iDiv.appendChild(iDiv2);  
    iDiv.onclick = function() { chnBox(index); };        
    if (index == boxIndex) {
        iDiv2.onmouseover =  function() { overBox(index, true); }
        iDiv2.onmouseout =  function() { overBox(index, false); }     
    }    
    return iDiv;
}

function CreateItemsMenu(items) {
    for (var j=0; j < items.length; ++j) {
        document.getElementById('box-items').appendChild( CreateItem(j, items[j] ) );
    }
    itemStopIndex = items.length;
}

function CreateItem(j, item) {
    var iDiv = document.createElement('div');
    iDiv.id = "item" + item.i;    
    iDiv.className = 'box box1';
    var iDiv2 = document.createElement('div');
    iDiv2.className = 'boxInfo itemInfo';
    if (item.r == 1) {                
        var img = document.createElement('img'); 
        img.src = "images/rotated.png";
        img.className = "imgRotated";
        iDiv2.appendChild( img );
    }    
    var radio = document.createElement("input");
    radio.type = "radio";
    radio.id = "stop" + (j+1);
    radio.name = "stop";
    radio.value = j + 1;
    radio.className = "radioItem";
    radio.setAttribute('checked', 'checked');
    radio.onclick = function() { chnStop( j + 1 ); };   
    iDiv2.appendChild(radio);
    var text = "Item " + item.i;
    iDiv2.appendChild( doP(text, 'boxTitle') );
    text =  'Size: ' + item.w + "x" + item.h + "x" + item.d;
    iDiv2.appendChild( doP( text, 'boxText') );
    text =  'Position: ' + item.x + "x" + item.y + "x" + item.z;
    iDiv2.appendChild( doP( text, 'boxText') );
    iDiv.appendChild(iDiv2);  
    iDiv2.onmouseover = function() { overItem(j, true); }
    iDiv2.onmouseout = function() { overItem(j, false); }    
    iDiv2.onclick = function() { chnStop( j + 1 ); };
    return iDiv;
}

/*---------------------------
    ACTIONS
/*-------------------------*/

function chnBox(index) {
    boxIndex = index;
    CreateMenu();
    drawScene();
}

function chnStop(index){
    document.getElementById("stop" + index).checked = true;
    itemStopIndex = index;
    drawBox();
}

function overBox(index, InOut) {
    if (document.getElementById("typeSubtract").checked) { return; }
    if (document.getElementById("typeWireFrame").checked) { 
        var element = scene.getObjectByName( "box" ); 
        element.material = InOut ? materialTypeWireFrame_selected : material0;    
    } else { 
        var element = scene.getObjectByName( "box" ); 
        element.material = InOut ? materialTypeSolid_selected : material0;
    }
    render();
}

function overItem(index, InOut) {
    if (document.getElementById("typeSubtract").checked) { return; } 
    if (index < itemStopIndex) {
        var element = scene.getObjectByName( "box" ); 
        var element2 = element.getObjectByName("itemBox" + index);        
        if (document.getElementById("typeWireFrame").checked) { 
            element2.material = InOut ? materialTypeWireFrame_selected : materialTypeWireFrame_Item;
        } else { 
            element2.material = InOut ? materialTypeSolid_selected : (document.getElementById("RamdomColor").checked ? 
                generateGrayColor(grayScale[index]) : materialTypeSolid_Item);
        }
        render();
    }    
}