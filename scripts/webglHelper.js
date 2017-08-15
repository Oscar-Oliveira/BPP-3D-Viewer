"use strict"

function toggleCam() { drawScene(); }

function toggleView() { 
    document.getElementById("RamdomColor").disabled = document.getElementById("typeSolid").checked ? false : true;
	drawBox(); 
}

function controlsToogle() {
    if (boxIndex == -1) { return; }
    controls.enabled = document.getElementById("cameraLock").checked;
}

function AxisToogle() {
    if (boxIndex == -1) { return; }
    if (document.getElementById("visibleAxis").checked) { scene.add( axis ); } 
	else { scene.remove( axis ); }
    render();
}

function planeToogle() {
    if (boxIndex == -1) { return; }
    if (document.getElementById("visiblePlane").checked) { scene.add( planes ); } 
	else { scene.remove( planes ); }
    render();
}

function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(), mat; 
    if(dashed) { mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 }); }
    else { mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex }); }
    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); 
    var axis = new THREE.Line( geom, mat, THREE.LineSegments );
    return axis;
}

function buildAxes(x, y, z) { 
    var axes = new THREE.Object3D();
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( x, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -x, 0, 0 ), 0xcccccc, true) ); // -X   
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, y, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -y, 0 ), 0xcccccc, true ) ); // -Y    
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, z ), 0x0000FF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -z ), 0xcccccc, true ) ); // -Z    
    return axes;
}

function buildPlanes( x, y, z ) { 
    var planes = new THREE.Object3D();  
    var geom1 = new THREE.Geometry(); 
    var geom2 = new THREE.Geometry(); 
    var geom3 = new THREE.Geometry();     
    geom1.renderOrder = 2000;
    geom2.renderOrder = 2000;
    geom3.renderOrder = 2000;    
    var v0 = new THREE.Vector3(0,0,0);    
    var v1 = new THREE.Vector3(x, 0, 0);
    var v2 = new THREE.Vector3(0, y,0);
    var v3 = new THREE.Vector3(0, 0, z);
    geom1.vertices.push(v0);
    geom1.vertices.push(v1);
    geom1.vertices.push(v2);    
    geom2.vertices.push(v0);
    geom2.vertices.push(v1);
    geom2.vertices.push(v3);    
    geom3.vertices.push(v0);
    geom3.vertices.push(v2);
    geom3.vertices.push(v3);
    geom1.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom2.faces.push( new THREE.Face3( 0, 1, 2 ) );
    geom3.faces.push( new THREE.Face3( 0, 1, 2 ) );
    var mesh1 = new THREE.Mesh( geom1, materialplanex );
    var mesh2 = new THREE.Mesh( geom2, materialplaney );
    var mesh3 = new THREE.Mesh( geom3, materialplanez );    
    mesh1.material.side = THREE.DoubleSide;
    mesh2.material.side = THREE.DoubleSide;
    mesh3.material.side = THREE.DoubleSide;    
    planes.add(mesh1);
    planes.add(mesh2);
    planes.add(mesh3);    
    return planes;
}