import { VrScreenView } from './VrScreenView';

require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var vrScreenView;
var div;

describe('VrScreenView', function() {

  before(function() {

    var sinon = require('sinon');
    vrScreenView = new VrScreenView();
    div = vrScreenView.view;

  });

  it("show() should call appenChild once", function(){
    
    var appendChild = sinon.fake();
    sinon.replace(document.body, 'appendChild', appendChild);
    vrScreenView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sinon.fake();
    sinon.replace(document.body, 'removeChild', removeChild);

    vrScreenView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

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
    
    var addEventListener = sinon.fake();
    sinon.replace(vrScreenView.view, 'addEventListener', addEventListener);

    var addEventListenerButton = sinon.fake();
    sinon.replace(vrScreenView.closeButton, 'addEventListener', addEventListenerButton);

    vrScreenView.addActionMode(closeFunction);

    expect(addEventListener).calledOnce;
    expect(addEventListener).calledWith("click", closeFunction);

    expect(addEventListenerButton).calledOnce;
    expect(addEventListenerButton).calledWith("click", closeFunction);
    

  })

  after(function () {
    sinon.restore();
  });
  
});
