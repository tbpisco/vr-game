import * as GameEvents from './signals/GameEvents.js';

const showVrMode = Symbol('showVrMode');
const openHelpScreen = Symbol('openHelpScreen');
const openVrScreen = Symbol('openVrScreen');

export class TaskbarPresenter {

	constructor(view, container) {

        this.view = view;
        this.container = container;
        window.addEventListener(GameEvents.ENABLE_VR, this[showVrMode].bind(this), false);

    };

    addTaskbar(){

    	this.view.show(this.container);
        this.view.addActionVr(this[openVrScreen].bind(this)); 
    	this.view.addActionHelp(this[openHelpScreen].bind(this)); 

    };

    setupModel(model){
        this.model = model;
    };

    hide(){
        this.view.hide();
    };

    [openHelpScreen](){
    	window.dispatchEvent(GameEvents.openHelpEvent);
    };

    [showVrMode](){
        this.view.toggleVR();
    };

    [openVrScreen](){
        if(this.model.getIsMobile()){
            this.model.setVrEnabled();            
            window.dispatchEvent(GameEvents.enableVr);
        } else {
            window.dispatchEvent(GameEvents.openVrEvent);
        }
    };    
}
