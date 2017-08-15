"use strict"

var grayScale = [];

var material0 = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0.0 });

var materialTypeWireFrame_Item = new THREE.MeshPhongMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
var materialTypeWireFrame_selected = new THREE.MeshPhongMaterial({ color: 0xFF0000, transparent: true, opacity: 0.5 });

var materialTypeSolid_Item = new THREE.MeshPhongMaterial({ color: 0xCCCCCC, shininess:10 });
materialTypeSolid_Item.shading = THREE.FlatShading;

var materialTypeSolid_selected = new THREE.MeshPhongMaterial({ color: 0xFF0000, shininess:10 });
materialTypeSolid_selected.shading = THREE.FlatShading;

var materialTypeSubstract = new THREE.MeshPhongMaterial({ color: 0xCCCCCC, shininess:10 });
materialTypeSubstract.shading = THREE.FlatShading;

var materialplanex = new THREE.MeshPhongMaterial({ color: 0xffcccc, transparent: true, opacity: 0.2 });   
materialplanex.shading = THREE.FlatShading;
var materialplaney = new THREE.MeshPhongMaterial({ color: 0xccFFcc, transparent: true, opacity: 0.2 });    
materialplaney.shading = THREE.FlatShading;
var materialplanez = new THREE.MeshPhongMaterial({ color: 0xccccFF, transparent: true, opacity: 0.3 }); 
materialplanez.shading = THREE.FlatShading;

materialplanex.fog = false;
materialplaney.fog = false;
materialplanez.fog = false;

function generateGrayColor(g) {
    var mTemp = new THREE.MeshLambertMaterial();
    mTemp.color.setHex("0x" + g.toString(16));
    return mTemp;
}

function fillGrayScale(l) {
    grayScale.length = 0;
    for(var i=0; i < l; ++i) {
        var value = Math.random() * 0xFF | 0;
        grayScale.push ( (value << 16) | (value << 8) | value ) ;
    }
}