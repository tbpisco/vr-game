import * as GameEvents from './signals/GameEvents.js';

export class VrScreenPresenter {

	constructor(view) {

       this.view = view; 
       window.addEventListener(GameEvents.OPEN_VR_SCREEN, this.openScreen.bind(this), false);
   
    }

    setupModel(_model){
        
        this.model = _model;
        this.view.addActionMode(this.closeScreen.bind(this));

    };

    openScreen(){
        
        this.view.show();
    };

    closeScreen(event){

        event.stopPropagation();
        this.view.hide();
        
    };

}
