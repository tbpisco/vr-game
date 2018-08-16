
const init = Symbol('init');
const addGameContainer = Symbol('addGameContainer');
const createGameContainer = Symbol('createGameContainer');

export class GameScreenView {

	constructor() {

        this[init]();
        
    };

    [init](){

        this[addGameContainer]();

    };

    [addGameContainer](){

        this.view = this[createGameContainer]();

    };

    [createGameContainer](){

        let view = document.createElement("div"); 
        view.id= "game-screen";
        return view;

    };

    getView(){

        return this.view;

    };

    hide(){

        document.body.removeChild(this.view);
        
    };

    show(){
        
        document.body.appendChild(this.view); 

    };
}
