"use strict";
    
var scene = new THREE.Scene();

var renderer = window.WebGLRenderingContext ? 
    new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true } ) : 
    new THREE.CanvasRenderer();

var container, camera, light, light1, controls = null, box, axis, planes;
var offset = 5;

function initScene() {    
    container = document.getElementById("webgl-container"); 
    renderer.setPixelRatio( window.devicePixelRatio );    
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( container.offsetWidth - offset, container.offsetHeight - offset );
    renderer.setClearColor( 0xffffff, 1);
    
    container.appendChild( renderer.domElement );    
    
    camera = new THREE.PerspectiveCamera( 55, container.offsetWidth / container.offsetHeight, 1, 3000 );
    scene.add( camera );
    
    light = new THREE.DirectionalLight( 'rgb(255,255,255)', 1);
    light.shadow.mapSize.width = 1024; 
    light.shadow.mapSize.height = 1024;
	scene.add( light );
            
    window.addEventListener( 'resize', onWindowResize, false );   
    
    THREEx.Screenshot.bindKey(renderer);    
    document.getElementById("sshot").onclick = (function takeScreenShot() { THREEx.Screenshot.call(renderer); }); 
    
    document.getElementById("RamdomColor").disabled = true;
        
    render();
    animate();
}

function setControls() { 
    if (document.getElementById("cam1").checked) {
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enablePan = true;
        controls.maxPolarAngle = 1 * Math.PI / 2;
    } else if (document.getElementById("cam2").checked) {
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.enableZoom = true;
        controls.enablePan = true;
    } else if (document.getElementById("cam3").checked) {
        controls = new THREE.TrackballControls( camera );    controls.rotateSpeed = 1.5;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.5;
        controls.noZoom = false;
        controls.noPan = false;
        controls.staticMoving = false;
        controls.dynamicDampingFactor = 0.25;
        controls.keys = [ 65, 83, 68 ];
    }
    controls.addEventListener( 'change', render );
}

function resetControls() {
    controls.dispose();
    controls = null;    
}				

function setLight(w, h, d) {
    light.lookAt( scene.position );
    light.position.copy( camera.position );
}

function setCamera(w, h, d) {
    var max = (w > h ? ((w > d) ? w : d) : ((h > d) ? h : d)) * 2;    
    camera.far =  max * 15;
    camera.updateProjectionMatrix();    
    camera.position.set(max, max, max); 
}

function drawScene() {
    if (boxIndex == -1) { return; }
    
    scene.remove( box );
    scene.remove( axis );
    scene.remove( planes );
    
    if (controls != null) { 
        controls.reset(); 
        resetControls();
    }
    
    fillGrayScale(Boxes.box[boxIndex].items.length);
    
    var a = Boxes.box[boxIndex];
    var inc = a.w < a.h ? ((a.w < a.d) ? a.w : a.d) : ((a.h < a.d) ? a.h : a.d);
   
    axis = buildAxes( a.w + inc, a.h + inc, a.d + inc );  
    planes = buildPlanes( a.w + inc, a.h + inc, a.d + inc );
    planes.receiveShadow = true;
    
    AxisToogle();
    planeToogle(); 
    
    drawBox();
    
    document.getElementById("cameraLock").checked = true;
    
    setControls();
    
    setCamera(a.w, a.h, a.d);
    setLight(a.w, a.h, a.d);
    
    render();    
}

function onWindowResize() {    
    camera.aspect =  container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth - offset, container.offsetHeight-offset);
    if (document.getElementById("cam3").checked && controls)  {controls.handleResize(); }
    render();
}
    
function animate() {
    requestAnimationFrame( animate );
    if (controls) { controls.update(); }
}

function render() { 
    light.position.copy( camera.position );
    renderer.render(scene, camera); 
}

window.onload = initScene;