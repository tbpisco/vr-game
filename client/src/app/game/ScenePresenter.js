import * as GameEvents from '../core/signals/GameEvents.js';

const init = Symbol('init');

export class ScenePresenter {

	constructor(view, _holder) {

        this.view = view;
        this.holder = _holder;
        //window.addEventListener(GameEvents.ENABLE_VR, this.enableVr.bind(this), false);
    };

    /*enableVr(){
        this.view.enableVr();
    };*/

    setupModel(model){
        this.model = model;

      /*  if(this.model.getIsMobile()){
            this.view.addEventsForMobile();
        } */
        
        this[init]();
    };

    [init](){ 
        
        this.view.init(this.holder);

        /*window.addEventListener("resize", this.resizeWindow.bind(this));

        this.resizeWindow();

        this.view.addTiles();

        this.view.canvas[0].addEventListener( 'mouseup', onDocumentMouseUp, false );
        this.view.canvas[0].addEventListener( 'mousedown', onDocumentMouseDown, false );
        this.view.canvas[0].addEventListener( 'mousemove', onDocumentMouseMove, false );*/
    };

    /*onDocumentMouseMove(event) {

        event.preventDefault();
        mouseMoveUpdate(event.clientX, event.clientY);

    };

    onDocumentMouseUp(event) {

        event.preventDefault();
        mouseUp(event.clientX, event.clientY,event.pageX, event.pageY, event.which);
    };

    onDocumentMouseDown(event) {

        event.preventDefault();
        mouseDown(event.pageX, event.pageY);
    };

    mouseDown(x,y) {

        event.preventDefault();
        self.mouseDownPosX = x;
        self.mouseDownPosY = y;

    };

    mouseMoveUpdate(x,y){

        var mouse = new THREE.Vector2();
        mouse.x = ( x / self.view.canvas[0].width ) * 2 - 1;
        mouse.y = - ( y / self.view.canvas[0].height ) * 2 + 1;

        var intersects = self.view.getIntersects(mouse);

    };

    mouseUp(x,y, pageX, pageY, which) {

        event.preventDefault();
        var mouse = new THREE.Vector2();
        mouse.x = ( x / self.view.canvas[0].width ) * 2 - 1;
        mouse.y = - ( y / self.view.canvas[0].height ) * 2 + 1;

        var intersects = self.view.getIntersects(mouse);
       
        self.mouseUpPosX = pageX;
        self.mouseUpPosY = pageY;
    
    };

    resizeWindow(){
       this.view.updateCanvasSize();
    };*/
    
}



