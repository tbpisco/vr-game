import OrbitControls from 'orbit-controls-es6';
import DeviceOrientationControls from 'device-orientation-control';
//import _Physijs from 'physijs-webpack/src/physi.js';
//import worker from 'physijs-webpack/src/physijs_worker.js';
//import ammo from 'ammo.js'

//var Physijs = _Physijs(THREE);

//Physijs.prototype.worker = '../../../node_modules/physijs/src/physijs_worker.js';
//Physijs.prototype.ammo = 'ammo.js';

const init = Symbol('init');
const addSceneContainer = Symbol('addSceneContainer');
const createSceneContainer = Symbol('createSceneContainer');

export class SceneView {

  constructor() {
  
  };

  init(_holder){

      this.holder = _holder;
      this[addSceneContainer]();
      this.addCanvasElement();
      this.addRendererWebGL();
      this.addScene();
      this.addCamera(false, 1, { x: 0 , y: 115 , z: 500 });  
      this.rotateCamera(-180,0,0);   
      //this.addLight();
      this.addFloor(1000,20);
      this.addControls(false);
      this.updateSceneSize();
      this.animate();

  };

  [addSceneContainer](){

    this.view = this[createSceneContainer]();

  };

  [createSceneContainer](){

    let view = document.createElement("div"); 
    view.id= "scene";
    return view;

  };

  addCanvasElement(){

    this.canvas = this.createCanvasElement();
    this.view.appendChild(this.canvas);

  };

  createCanvasElement(){

    let view = document.createElement("canvas"); 
    view.id= "scene-stage";
    return view;

  };

  addRendererWebGL(){
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias:true});
    this.renderer.sortObjects = false;
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.autoClear = false;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.soft = true;
 };

 addScene(){
    this.scene = new THREE.Scene();
   // this.scene = new Physijs.Scene();
    /*this.scene.setGravity(new THREE.Vector3(0,-30,0));
    this.scene.addEventListener('update', function(){ 
        this.scene.simulate(undefined,2);
    }.bind(this))*/
    //this.scene.background = new THREE.Color("skyblue");
 };

 addCamera(VRViewEnabled, aspectRatio, position){
    if(VRViewEnabled){
        this.camera = new THREE.PerspectiveCamera(95, aspectRatio, 0.001, 1000);
        this.camera.position.set(100,100,100);
    } else {
        this.camera = new THREE.PerspectiveCamera(70, aspectRatio, 1, 10000);
        if(position)this.camera.position.set( position.x , position.y , position.z);
            else this.camera.position.set( 0 , 700 , 0);
    }
    this.scene.add(this.camera);
};

rotateCamera(x,y,z){
    this.camera.rotation.set(x*Math.PI/180,y*Math.PI/180,z*Math.PI/180);
}

addFloor(size, divisions){
    var floor = new THREE.GridHelper( size, divisions , 0Xff8888, 0X55dddd);
    this.scene.add( floor );
}

addElement(position){

    var geometry = new THREE.SphereGeometry( 5, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new /*Physijs.SphereMesh*/THREE.Mesh( geometry, material );
    sphere.position.set(position.x, position.y, position.z);
    this.scene.add( sphere );

}

addLight(width, height){

    this.light = new THREE.HemisphereLight(0xffffbb , 0x080820,1);
    this.light.position.copy(new THREE.Vector3(0,500,0));
    this.lightHelper = new THREE.HemisphereLightHelper(this.light,200);
     
    this.scene.add( this.light );
 
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    this.directionalLight.color.setHSL(0.1, 1,0.95);
    this.directionalLight.position.set(-1,1.75,1);
    this.directionalLight.position.multiplyScalar(30);
 
    this.directionalLight.castShadow = true;
     
     this.directionalLight.shadow.camera.near = 2;
     this.directionalLight.shadow.camera.far = 5;
     this.directionalLight.shadow.camera.left = -0.5;
     this.directionalLight.shadow.camera.right = 0.5;
     this.directionalLight.shadow.camera.top = 0.5;
     this.directionalLight.shadow.camera.bottom = -0.5;
 
     //this.directionalLight.shadow.map.width = width;
     //this.directionalLight.shadow.map.height = height;
 
     this.scene.add(this.directionalLight);
 
     this.spotLight = new THREE.SpotLight( 0xffffff );
     this.spotLight.position.set( 100, 2000, 100 );
     this.spotLight.scale.set( 10, 10, 10 );
     this.spotLight.intensity = 0.3;
     this.spotLight.castShadow = true;
 
     this.spotLight.shadow.camera.near = 500;
     this.spotLight.shadow.camera.far = 4000;
     this.spotLight.shadow.camera.fov = 30;
 
 
     this.scene.add( this.spotLight );
 };

 updateSceneSize(){

    let width = this.view.clientWidth;
    let height = this.view.clientHeight;

    this.updateCanvasSize(width, height);
    this.updateRendererSize(width, height);
    this.updateCameraSize(width / height);

 };

 updateCanvasSize(width, height){
   
    this.canvas.width = width;
    this.canvas.height = height;
 
 };

 updateRendererSize(width, height){

    this.renderer.setSize(width, height);
    
 }

 updateCameraSize(aspectRatio){

    this.camera.aspect = aspectRatio;
    this.camera.updateProjectionMatrix();

 }

 addControls(VRViewEnabled){

    if(VRViewEnabled){
        this.controls = new DeviceOrientationControls(this.camera);
    } else {
        this.controls = new OrbitControls( this.camera , this.canvas);
    }
    this.controls.damping = 0.2;
    
};

 animate() {

    requestAnimationFrame(this.animate.bind(this));
    this.renderer.clear();

    if(this.effect)this.effect.render(this.scene, this.camera);
        else this.renderer.render(this.scene, this.camera);

    if(this.controls)this.controls.update();

};

/*
enableVr(){
  this.VRViewEnabled = !this.VRViewEnabled;
  resetCameraControls();
  addCamera();
  addControls();
  if(self.VRViewEnabled)self.effect = new THREE.StereoEffect(self.renderer);
  self.updateCanvasSize();
};

resetCameraControls(){
    if(self.scene)self.scene.remove(self.camera);
    self.camera = null;
    self.controls = null;
    self.effect = null;
};



addEventsForMobile(){
    //window.addEventListener( 'orientationchange', self.updateCanvasSize, false );
    //window.addEventListener( 'deviceorientation', self.updateCanvasSize, false );
};


createSky(){
    var geometry = new THREE.SphereGeometry( 3000, 32, 32 );
    var material = self.ceu;
    material.side = THREE.DoubleSide;
    var sky = new THREE.Mesh( geometry, material );
    sky.position.y = 1000;
    self.scene.add( sky );
};

getIntersects(mouse){
   // this.raycaster.setFromCamera( mouse, this.camera );
  //  return this.raycaster.intersectObjects( this.objects );
};


addElement(name){
    //self.scene.add(self[name]);
};

  removeObjectInScene(){
    var object = this.scene.getObjectByName(name);
    if(object){

      for (var i = 0; i < this.objects.length; i++) {
        if(this.objects[i].name == name){
            this.objects.splice(i, 1);
        }
      }

      this.scene.remove( object );
    }
  }*/

  getView(){
    return this.view;
  };

  hide(){
    this.holder.removeChild(this.view);
  };

  show(){
    this.holder.appendChild(this.view); 
  };
}

