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
    this.renderer.shadowMapEnabled = true;
    this.renderer.shadowMapSoft = true;
 };
/*
addScene(){
    //self.scene = new THREE.Scene();
    //self.scene.background = new THREE.Color("skyblue");
};

addCamera(){
    if(self.VRViewEnabled){
        self.camera = new THREE.PerspectiveCamera(95, self.widthApp/self.heightApp, 0.001, 700);
        self.camera.position.set( 100,100,100);
    } else {
        self.camera = new THREE.PerspectiveCamera(45, self.widthApp / self.heightApp, 0.1, 20000);
        self.camera.position.set( 200,700,800);
    }
    self.scene.add(self.camera);
};

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

addLight(){

   /* self.light = new THREE.HemisphereLight(0xffffbb , 0x080820,1);
    self.light.position.copy(new THREE.Vector3(0,500,0));
    self.lightHelper = new THREE.HemisphereLightHelper(self.light,200);
    
    self.scene.add( self.light );

    self.directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    self.directionalLight.color.setHSL(0.1, 1,0.95);
    self.directionalLight.position.set(-1,1.75,1);
    self.directionalLight.position.multiplyScalar(30);

    self.directionalLight.castShadow = true;
    self.directionalLight.shadowDarkness = 0.5;
    //self.directionalLight.shadowCameraVisible = true; // only for debugging
    
    self.directionalLight.shadowCameraNear = 2;
    self.directionalLight.shadowCameraFar = 5;
    self.directionalLight.shadowCameraLeft = -0.5;
    self.directionalLight.shadowCameraRight = 0.5;
    self.directionalLight.shadowCameraTop = 0.5;
    self.directionalLight.shadowCameraBottom = -0.5;

    self.directionalLight.shadowMapWidth = self.widthApp;
    self.directionalLight.shadowMapHeight = self.heightApp;

    self.scene.add(self.directionalLight);

    self.spotLight = new THREE.SpotLight( 0xffffff );
    self.spotLight.position.set( 100, 2000, 100 );
    self.spotLight.scale.set( 10, 10, 10 );
    self.spotLight.intensity = 0.3;
    self.spotLight.castShadow = true;

    //self.spotLight.shadow.mapSize.width = self.widthApp;
    //self.spotLight.shadow.mapSize.height = self.heightApp;

    self.spotLight.shadow.camera.near = 500;
    self.spotLight.shadow.camera.far = 4000;
    self.spotLight.shadow.camera.fov = 30;


    self.spotLight = new THREE.SpotLight( 0xffffff );
    self.spotLight.position.set( 100, 2000, 100 );
    self.spotLight.scale.set( 10, 10, 10 );
    self.spotLight.intensity = 0.3;
    self.spotLight.castShadow = true;

    self.spotLight.shadowMapWidth = self.widthApp;
    self.spotLight.shadowMapHeight = self.heightApp;

    self.spotLight.shadowCameraNear = 500;
    self.spotLight.shadowCameraFar = 4000;
    self.spotLight.shadowCameraFov = 30;

    self.scene.add( self.spotLight );
};

addEvents(){
   // self.raycaster = new THREE.Raycaster();
};

addControls(){
    if(self.VRViewEnabled){
        self.controls = new THREE.DeviceOrientationControls(self.camera);
    } else {
        self.controls = new THREE.OrbitControls( self.camera , self.canvas[0]);
    }
    self.controls.damping = 0.2;
};

addEventsForMobile(){
    //window.addEventListener( 'orientationchange', self.updateCanvasSize, false );
    //window.addEventListener( 'deviceorientation', self.updateCanvasSize, false );
};

addTiles(){

   this.objects = [];

    this.matrixTiles = [];
    for (var i = 0; i < QTD_TILES; i++) {
      this.matrixTiles.push([]);
    };

    for (var i = 0; i < this.matrixTiles.length; i++) {
      for (var j = 0; j < this.matrixTiles.length; j++) {
         this.matrixTiles[i].push(0);
      }
    };

      var tamanhoTile = TAMANHO_TILE;
      for (var i = 0; i < this.matrixTiles.length; i++) {
        for (var j = 0; j < this.matrixTiles[i].length; j++) {

            var tileVazio = new THREE.Mesh(new THREE.BoxGeometry(tamanhoTile, 40, tamanhoTile), this.materialsTerra);
            tileVazio.overdraw = true;
            tileVazio.position.x = -15*tamanhoTile/2 + tamanhoTile*i;
            tileVazio.position.z = -15*tamanhoTile/2 + tamanhoTile*j;
            tileVazio.receiveShadow = true;
            tileVazio.name = "tile-" + i + j;
            this.objects.push(tileVazio);
            this.scene.add(tileVazio);
        
        };
      };    
      
};

var createSky = function(){
    var geometry = new THREE.SphereGeometry( 3000, 32, 32 );
    var material = self.ceu;
    material.side = THREE.DoubleSide;
    var sky = new THREE.Mesh( geometry, material );
    sky.position.y = 1000;
    self.scene.add( sky );
};

createTexture(name, src){
   // var texture = new THREE.TextureLoader().load( src );
   // self[name] = new THREE.MeshLambertMaterial( { map: texture } );
};


getIntersects(mouse){
   // this.raycaster.setFromCamera( mouse, this.camera );
  //  return this.raycaster.intersectObjects( this.objects );
};


addElement(name){
    //self.scene.add(self[name]);
};

updateCanvasSize(){
   self.widthApp = self.view.width();
   self.heightApp = self.view.height();

   self.renderer.setSize(self.widthApp, self.heightApp);

   if(self.VRViewEnabled){
        self.camera.aspect = self.widthApp / self.heightApp;
   } else {
        self.camera.aspect = self.widthApp / self.heightApp;
   }
   
   self.camera.updateProjectionMatrix();
};

  animate() {

      requestAnimationFrame(animate);
      self.renderer.clear();

      if(self.VRViewEnabled){
          
          self.effect.render(self.scene, self.camera);

      } else {

          self.renderer.render(self.scene, self.camera);

      }
      
      self.controls.update();
  };


  addNewModel(object, model){
      
      newModel = new THREE.Mesh( self[model].geometry , materials );
      newModel.name = newName;
      newModel.opacity = 1;
      newModel.position.set( object.position.x,  object.position.y,  object.position.z);
      newModel.castShadow = true;
      
      self.objects.push( newModel );
      self.scene.add( newModel );

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

