import { VrScreenPresenter } from './VrScreenPresenter';

var vrScreenPresenter;
var vrScreenViewElement;

describe('VrScreenPresenter', function() {

  before(function() {

    vrScreenViewElement = document.createElement("div");
    vrScreenViewElement.addActionMode = function(){};
    vrScreenViewElement.setupModel = function(){};
    vrScreenViewElement.show = function(){};
    vrScreenViewElement.hide = function(){};

    vrScreenPresenter = new VrScreenPresenter(vrScreenViewElement);

  });
  
  
  it("should VrScreenPresenter constructor creates a view object reference inside this vrScreenPresenter class", function(){ 

    expect(vrScreenPresenter.view).to.be.equal(vrScreenViewElement);

  });

  it("should openScreen() call view methods", function(){ 
   
    var show = sandbox.spy(vrScreenViewElement, "show");

    vrScreenPresenter.openScreen();
    
    expect(show).calledOnce;

    sandbox.restore();

  })

  it("should setupModel() creates a model object reference inside this vrScreenPresenter class", function(){ 

    var model = { getValue: function() {} };
    var addActionMode = sandbox.spy(vrScreenViewElement, "addActionMode");

    vrScreenPresenter.setupModel(model);

    expect(vrScreenPresenter.model).to.be.equal(model);
    expect(addActionMode).calledOnce;

    sandbox.restore();
  });

  it("should closeScreen() call hide method from view", function(){ 

    var hide = sandbox.spy(vrScreenViewElement, "hide");

    var event = { stopPropagation : function(){} };
    
    var stopPropagation = sandbox.spy(event, 'stopPropagation');

    vrScreenPresenter.closeScreen(event);
    expect(hide).calledOnce;
    expect(stopPropagation).calledOnce;

    sandbox.restore();

  })
  
});
