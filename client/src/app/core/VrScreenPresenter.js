import * as GameEvents from './signals/GameEvents.js';

const openScreen = Symbol('openScreen');

export class VrScreenPresenter {

	constructor(view) {

       this.view = view; 
       window.addEventListener(GameEvents.OPEN_VR_SCREEN, this[openScreen].bind(this), false);
   
    }

    setupModel(_model){
        this.view.setupModel(_model);
    };

    [openScreen](){
        this.view.addActionMode(this.closeScreen.bind(this));
        this.view.show();
    };

    closeScreen(){
        this.view.hide();
    };

}
