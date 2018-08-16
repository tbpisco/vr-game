import * as GameEvents from './signals/GameEvents.js';

const closeHelpScreen = Symbol('closeHelpScreen');

export class HelpScreenPresenter {

	constructor(view) {
        
        this.view = view; 
        window.addEventListener(GameEvents.OPEN_HELP_SCREEN, this.openHelpScreen.bind(this), false);
    }

    setupModel(_model){
        this.model = _model;
    };

    openHelpScreen(){      
        this.view.addHelpScreenContainer("");
        this.view.addActionMode(this[closeHelpScreen].bind(this));
        this.view.show();
    };

    [closeHelpScreen](){
        this.view.hide();
    };
}
