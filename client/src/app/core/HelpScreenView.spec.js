import { HelpScreenView } from './HelpScreenView';

var helpScreenView;
var div;

describe('HelpScreenView', function() {

  before(function() {

    helpScreenView = new HelpScreenView();
    helpScreenView.addHelpScreenContainer("testing content.");
    div = helpScreenView.view;

  });

  it("show() should call appenChild once", function(){
    
    var appendChild = sandbox.spy(document.body, 'appendChild');
    helpScreenView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

    sandbox.restore();

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sandbox.spy(document.body, 'removeChild');
    helpScreenView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

    sandbox.restore();

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
    
    var addEventListener = sandbox.spy(helpScreenView.view, 'addEventListener');
    var addEventListenerButton = sandbox.spy(helpScreenView.closeButton, 'addEventListener');

    helpScreenView.addActionMode(closeFunction);

    expect(addEventListener).calledOnce;
    expect(addEventListener).calledWith("click", closeFunction);

    expect(addEventListenerButton).calledOnce;
    expect(addEventListenerButton).calledWith("click", closeFunction);
    
    sandbox.restore();
  })
  
});
