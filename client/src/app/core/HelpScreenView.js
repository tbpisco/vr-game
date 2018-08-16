const addTitleContainer = Symbol('addTitleContainer');
const createTitleContainer = Symbol('createTitleContainer');
const addInstructionContainer = Symbol('addInstructionContainer');
const createInstructionContainer = Symbol('createInstructionContainer');
const addCloseButton = Symbol('addCloseButton');
const createCloseButton = Symbol('createCloseButton');
const createHelpScreenContainer = Symbol('createHelpScreenContainer');
const createHelpScreenInnerContainer = Symbol('createHelpScreenInnerContainer');

export class HelpScreenView {

	constructor() {
        
    };

    addHelpScreenContainer(content){
        this.view = this[createHelpScreenContainer]();
        this.innerView = this[createHelpScreenInnerContainer]();
        this.view.appendChild(this.innerView);
        this[addTitleContainer]();
        this[addInstructionContainer](content);
        this[addCloseButton]();
    };

    [addTitleContainer](){
        this.titleView = this[createTitleContainer]();
        this.innerView.appendChild(this.titleView);
    };

    [addInstructionContainer](content){
        this.instructionView = this[createInstructionContainer](content);
        this.innerView.appendChild(this.instructionView);
    };

    [addCloseButton](){
        this.closeButton = this[createCloseButton]();
        this.innerView.appendChild(this.closeButton);
    };

    [createCloseButton](){
        let view = document.createElement("button"); 
        view.className = "close-button";
        view.innerText = "OK";
        return view;
    };

    [createHelpScreenContainer](){
        let view = document.createElement("div"); 
        view.id = "help-screen";
        return view;
    };

    [createHelpScreenInnerContainer](){
        let view = document.createElement("div"); 
        view.className = "inner-container";
        return view;
    };

    [createTitleContainer](){
        let view = document.createElement("div"); 
        view.className = "title";
        view.innerText = "HELP";
        return view;
    };

    [createInstructionContainer](content){
        let view = document.createElement("div"); 
        view.innerHTML = content;
        return view;
    };

    addActionMode(_action){

        this.closeButton.addEventListener("click", _action);
        this.view.addEventListener("click", _action);

    };

    hide(){

        document.body.removeChild(this.view);
        
    };

    show(){
        
        document.body.appendChild(this.view); 

    };
}