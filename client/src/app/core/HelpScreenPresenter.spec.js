import { HelpScreenPresenter } from './HelpScreenPresenter';

var helpScreenPresenter;
var helpScreenViewElement;

describe('HelpScreenPresenter', function() {

  before(function() {

    helpScreenViewElement = document.createElement("div");
    helpScreenViewElement.addHelpScreenContainer = function(){};
    helpScreenViewElement.addActionMode = function(){};
    helpScreenViewElement.show = function(){};

    helpScreenPresenter = new HelpScreenPresenter(helpScreenViewElement);

  });
  
  
  it("should HelpScreenPresenter constructor creates a view object reference inside this helpScreenPresenter class", function(){ 

    expect(helpScreenPresenter.view).to.be.equal(helpScreenViewElement);

  });

  it("should openHelpScreen() call view methods", function(){ 

    var show = sandbox.spy(helpScreenViewElement, "show");
    helpScreenPresenter.openHelpScreen();
    expect(show).calledOnce;

    sandbox.restore();

  })

  it("should setupModel() creates a model object reference inside this helpScreenPresenter class", function(){ 

    var model = { getValue: function(){} };

    var addHelpScreenContainer = sandbox.spy(helpScreenViewElement, "addHelpScreenContainer");
    var addActionMode = sandbox.spy(helpScreenViewElement, "addActionMode");

    helpScreenPresenter.setupModel(model);
    expect(helpScreenPresenter.model).to.be.equal(model);

    expect(addHelpScreenContainer).calledOnce;
    expect(addHelpScreenContainer).calledWith("Help instructions goes here.");
    expect(addActionMode).calledOnce;

    sandbox.restore();

  });

  after(function () {
    
  });
  
});
