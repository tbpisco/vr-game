import { HelpScreenView } from './HelpScreenView';

require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var helpScreenView;
var div;

describe('HelpScreenView', function() {

  before(function() {

    var sinon = require('sinon');
    helpScreenView = new HelpScreenView();
    helpScreenView.addHelpScreenContainer("testing content.");
    div = helpScreenView.view;

  });

  it("show() should call appenChild once", function(){
    
    var appendChild = sinon.fake();
    sinon.replace(document.body, 'appendChild', appendChild);
    helpScreenView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sinon.fake();
    sinon.replace(document.body, 'removeChild', removeChild);
    helpScreenView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

  })

  it("should view return a div with class equals 'help-screen'", function(){
    
    expect(helpScreenView.view).have.id('help-screen');

  })

  it("should view return a div with class equals 'inner-container'", function(){
    
    expect(helpScreenView.view.querySelector("div")).have.class('inner-container');

  })

  it("should create a div with class 'title' and innerText equals 'HELP'", function(){
    
    expect(helpScreenView.view.querySelector(".title").innerText).to.equals('HELP');

  })

  it("should create a div with class equals 'close-button' and innerText equals OK", function(){
    
    expect(helpScreenView.view.querySelector(".close-button").innerText).to.equals('OK');

  })

  it("should create a p element with innerText equals the argument from addHelpScreenContainer()", function(){
    
    expect(helpScreenView.view.querySelector("p")).have.text("testing content.");

  })

  it("should addActionMode() add a click event on view and closeButton element", function(){
    
    var closeFunction = function(){};
    
    var addEventListener = sinon.fake();
    sinon.replace(helpScreenView.view, 'addEventListener', addEventListener);

    var addEventListenerButton = sinon.fake();
    sinon.replace(helpScreenView.closeButton, 'addEventListener', addEventListenerButton);

    helpScreenView.addActionMode(closeFunction);

    expect(addEventListener).calledOnce;
    expect(addEventListener).calledWith("click", closeFunction);

    expect(addEventListenerButton).calledOnce;
    expect(addEventListenerButton).calledWith("click", closeFunction);
    

  })

  after(function () {
    sinon.restore();
  });
  
});
