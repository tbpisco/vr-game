import * as GameEvents from './signals/GameEvents.js';

const closeHelpScreen = Symbol('closeHelpScreen');

export class HelpScreenPresenter {

	constructor(view) {
        
        this.view = view; 
        window.addEventListener(GameEvents.OPEN_HELP_SCREEN, this.openHelpScreen.bind(this), false);
    }

    setupModel(_model){

        this.model = _model;
        this.view.addHelpScreenContainer("Help instructions goes here.");
        this.view.addActionMode(this[closeHelpScreen].bind(this));

    };

    openHelpScreen(){      
        
        this.view.show();
    };

    [closeHelpScreen](event){
        event.stopPropagation();
        this.view.hide(event);
    };
}
