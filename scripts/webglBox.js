"use strict"

function drawBox() {
    if (boxIndex == -1) { return; }    
    scene.remove( box );    
    if (document.getElementById("typeSolid").checked) { drawBoxSolid(); } 
	else if (document.getElementById("typeWireFrame").checked) { drawBoxWireFrame(); } 
	else { drawBoxSubstract(); } 
    render();     
}

function toPosition(aw, ah, ad, ax, ay, az) {    
    var x = (aw / 2) + ax;
    var y = (ah / 2) + ay;
    var z = (ad / 2) + az;  
    return new THREE.Matrix4().makeTranslation(x, y, z); 
}

function drawBoxSolid() {   
    var a = Boxes.box[boxIndex];
    var geometry = new THREE.BoxGeometry(a.w, a.h, a.d);
    geometry.applyMatrix( toPosition(a.w, a.h, a.d, 0, 0, 0) );    
    box = new THREE.Mesh( geometry, material0 );        
    box.name = "box";
    box.renderOrder = 1000;    
    var egh = new THREE.EdgesHelper( box, 0x000000 );
    egh.material.linewidth = 2;    
    box.add( egh );  
    scene.add( box );    
    for (var i=0; i < itemStopIndex; ++i) { 
        drawItemSolid(a.items[i], i, document.getElementById("RamdomColor").checked ? generateGrayColor(grayScale[i]) : materialTypeSolid_Item );
    } 
}

function drawItemSolid(item, i, m) {
    var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    var box1 = new THREE.Mesh( geometry, m ); 
    box1.name = "itemBox" + i;
    box1.renderOrder = i;
    box1.castShadow = true; 
    box1.receiveShadow = true;
    geometry.applyMatrix( toPosition(item.w, item.h, item.d, item.x, item.y, item.z) );       
    box.add( box1 );    
}

function drawBoxWireFrame() {   
    var a = Boxes.box[boxIndex];
    var geometry = new THREE.BoxGeometry(a.w, a.h, a.d);
    geometry.applyMatrix( toPosition(a.w, a.h, a.d, 0, 0, 0) );    
    box = new THREE.Mesh( geometry, material0 );        
    box.name = "box";
    box.renderOrder = 1000;    
    var egh = new THREE.EdgesHelper( box, 0x000000 );
    egh.material.linewidth = 1;    
    box.add( egh );  
    scene.add( box );
    for (var i=0; i < itemStopIndex; ++i) { drawItemWireframe(a.items[i], i, materialTypeWireFrame_Item); } 
}

function drawItemWireframe(item, i, m) {
    var geometry = new THREE.BoxGeometry(item.w, item.h, item.d);
    var box1 = new THREE.Mesh( geometry, m ); 
    box1.name = "itemBox" + i;
    box1.renderOrder = i;
    box1.castShadow = true;    
    geometry.applyMatrix( toPosition(item.w, item.h, item.d, item.x, item.y, item.z) );    
    var egh1 = new THREE.EdgesHelper( box1, 0x000000 );
    egh1.material.linewidth = 1;    
    box1.add(egh1);    
    box.add( box1 );    
}

function drawBoxSubstract() {
    var a = Boxes.box[boxIndex];
    var cube_geometry = new THREE.CubeGeometry( a.w, a.h, a.d );
    cube_geometry.applyMatrix( toPosition(a.w, a.h, a.d, 0, 0, 0) ); 
    var cube_mesh = new THREE.Mesh( cube_geometry );
	var cube_bsp = new ThreeBSP( cube_mesh );
    var subtract_bsp = cube_bsp;		
    for (var i=0; i < itemStopIndex; ++i) {              
        var itemg = new THREE.CubeGeometry( a.items[i].w, a.items[i].h, a.items[i].d);
        itemg.applyMatrix( toPosition(a.items[i].w, a.items[i].h, a.items[i].d, a.items[i].x, a.items[i].y, a.items[i].z) ); 
        var item_mesh = new THREE.Mesh( itemg );
        var item_bsp = new ThreeBSP( item_mesh );        
        subtract_bsp = subtract_bsp.subtract( item_bsp );        
    }
    box = subtract_bsp.toMesh( materialTypeSubstract );		
	box.geometry.computeVertexNormals();
    box.name = "box";
	scene.add( box ); 
}