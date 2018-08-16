
const init = Symbol('init');
const addTaskbarContainer = Symbol('addTaskbarContainer');
const addMenuTools = Symbol('addMenuTools');
const addEvents = Symbol('addEvents');
const createTaskbarContainer = Symbol('createTaskbarContainer');
const createMenuTools = Symbol('createMenuTools');

export class TaskbarView {

	constructor() {

        this[init]();

    };

    [init](){
        this[addTaskbarContainer]();
        this[addMenuTools]();
        this[addEvents]();
    };    

    [addTaskbarContainer](){
        this.view = this[createTaskbarContainer]();
    };

    [createTaskbarContainer](){

        let view = document.createElement("ul"); 
        view.className = "taskbar clear";
        return view;

    };

    [addMenuTools](){

        this.menuTools = this[createMenuTools]();
        this.view.appendChild(this.menuTools);

    };

    [addEvents](){

    };

    [createMenuTools](){

        let view = document.createElement("ul"); 
        view.className = "menu-mode";
        let html = "";
 
        html += '    <li data-id="cardboard-tool"><a href="#"><span><img class="cardboard-icon" src="images/cardboard.svg"</span></a></li>';
        html += '    <li data-id="help-button"><a href="#"><i class="fas fa-question"></i></a></li>'

        view.innerHTML = html;
        return view;
    
    };  

    addActionHelp(_action){
       this.menuTools.querySelector('li[data-id="help-button"] a').addEventListener("click", _action);
    };

    addActionVr(_action){
        this.menuTools.querySelector('li[data-id="cardboard-tool"] a').addEventListener("click", _action);
    };

    toggleVR(){
        this.view.classList.toggle("vr");
    };

    setupModel(_model){
        
    };
    
    hide(){

        this.container.removeChild(this.view);
        
    };

    show(container){
        this.container = container;
        this.container.appendChild(this.view); 

    };


}
