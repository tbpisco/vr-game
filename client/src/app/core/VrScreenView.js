const addScreenContainer = Symbol('addScreenContainer');
const addTitleContainer = Symbol('addTitleContainer');
const addInstructionContainer = Symbol('addInstructionContainer');
const createScreenContainer = Symbol('createScreenContainer');
const addQRCode = Symbol('addQRCode');
const addCloseButton = Symbol('addCloseButton');
const createTitleContainer = Symbol('createTitleContainer');
const createInstructionContainer = Symbol('createInstructionContainer');
const createCloseButton = Symbol('createCloseButton');
const createQRCode = Symbol('createQRCode');

export class VrScreenView {

	constructor() {

        this[addScreenContainer]();

    };

    [addScreenContainer](){
        
        this.view = this[createScreenContainer]();  
        this.view.appendChild(this.container);      
        this[addTitleContainer]();
        this[addInstructionContainer]();
        this[addQRCode]();
        this[addCloseButton]();
        
    };

    [addTitleContainer](){
        this.titleView = this[createTitleContainer]();
        this.container.appendChild(this.titleView);
    };

    [addInstructionContainer](){
        this.instructionView = this[createInstructionContainer]()
        this.container.appendChild(this.instructionView);
    };

    [addCloseButton](){
        this.closeButton = this[createCloseButton]();
        this.container.appendChild(this.closeButton);
    };

    [createCloseButton](){
        let view = document.createElement("button"); 
        view.className= "close-button";
        view.innerText = "OK";
        return view;
    };

    [createScreenContainer](){
        let view = document.createElement("div"); 
        view.id= "vr-screen";
        this.container = document.createElement("div"); 
        this.container.className = "inner-container";
        return view;
    };

    [createTitleContainer](){
        let view = document.createElement("h1"); 
        view.className= "title";
        view.innerText = "VR CARDBOARD";
        return view;
    };

    [createInstructionContainer](){

        let view = document.createElement("p"); 
        view.className= "instruction";
        view.innerText = "Scan with your smartphone to access the VR Mode.";
        return view;

    };

    [createQRCode](){

        let view = document.createElement("div"); 
        view.id= "qr-code";
        return view;

    };

    [addQRCode](){
       this.qrCode = this[createQRCode]();
       this.container.appendChild(this.qrCode);
       /*var qrcodeElement = new QRCode(this.qrCode, {
        text: window.location.href.split("?")[0] + "?vr=true",
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff"
        });*/
    };

    addActionMode(_action){
        this.closeButton.addEventListener("click", _action);
    };

    hide(){

        document.body.removeChild(this.view);
        
    };

    show(){
        
        document.body.appendChild(this.view); 

    };

   
};