import { VrScreenView } from './VrScreenView';

var vrScreenView;
var div;

describe('VrScreenView', function() {

  before(function() {

    vrScreenView = new VrScreenView();
    div = vrScreenView.view;

  });

  it("show() should call appenChild once", function(){
    
    var appendChild = sandbox.spy(document.body, 'appendChild');
    vrScreenView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

    sandbox.restore();

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sandbox.spy(document.body, 'removeChild');

    vrScreenView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

    sandbox.restore();

  })

  it("should view return a div with class equals 'vr-screen'", function(){
    
    expect(vrScreenView.view).have.id('vr-screen');

  })

  it("should view return a div with class equals 'inner-container'", function(){
    
    expect(vrScreenView.view.querySelector("div")).have.class('inner-container');

  })

  it("should create a div with class 'title' and innerText equals 'VR CARDBOARD'", function(){
    
    expect(vrScreenView.view.querySelector(".title").innerText).to.equals('VR CARDBOARD');

  })

  it("should create a div with class equals 'close-button' and innerText equals OK", function(){
    
    expect(vrScreenView.view.querySelector(".close-button").innerText).to.equals('OK');

  })

  it("should create a p element with innerText equals 'Scan with your smartphone to access the VR Mode.'", function(){
    
    expect(vrScreenView.view.querySelector("p").innerText).to.be.equal("Scan with your smartphone to access the VR Mode.");

  })

  it("should addActionMode() add a click event on view and closeButton element", function(){
    
    var closeFunction = function(){};
    
    var addEventListener = sandbox.spy(vrScreenView.view, 'addEventListener');

    var addEventListenerButton = sandbox.spy(vrScreenView.closeButton, 'addEventListener');

    vrScreenView.addActionMode(closeFunction);

    expect(addEventListener).calledOnce;
    expect(addEventListener).calledWith("click", closeFunction);

    expect(addEventListenerButton).calledOnce;
    expect(addEventListenerButton).calledWith("click", closeFunction);
    
    sandbox.restore();

  })
  
});
