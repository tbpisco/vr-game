import * as GameEvents from './signals/GameEvents.js';

const showVrGlass = Symbol('showVrGlass');

export class VrGlassPresenter {

	constructor(view) {

        this.view = view;
        window.addEventListener(GameEvents.ENABLE_VR, this[showVrGlass].bind(this), false);

    };

    [showVrGlass](){
        if(this.model.getVrEnabled()){
            this.view.show();
        } else {
            this.view.hide();
        }
        
    };

    setupModel(model){
        this.model = model;
    };

}


