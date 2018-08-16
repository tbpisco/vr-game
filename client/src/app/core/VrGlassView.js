const init = Symbol('init');
const addContainer = Symbol('addContainer');
const createContainer = Symbol('createContainer');

export class VrGlassView {

	constructor(_holder) {

        this.holder = _holder;
        this[init]();

    };

    [init](){
        this[addContainer]();
    };

    [addContainer](){
        this.view = this[createContainer]();
    };

    [createContainer](){
        let view = document.createElement("div"); 
        view.className = "vr";
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