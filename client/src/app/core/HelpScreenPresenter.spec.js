import { HelpScreenPresenter } from './HelpScreenPresenter';

require('jsdom-global')();
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

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

    var addHelpScreenContainer = sinon.spy(helpScreenViewElement, "addHelpScreenContainer");
    var addActionMode = sinon.spy(helpScreenViewElement, "addActionMode");
    var show = sinon.spy(helpScreenViewElement, "show");

    helpScreenPresenter.openHelpScreen();

    expect(addHelpScreenContainer).calledOnce;
    expect(addHelpScreenContainer).calledWith("Help instructions goes here.");
    expect(addActionMode).calledOnce;
    expect(show).calledOnce;

  })

  it("should setupModel() creates a model object reference inside this helpScreenPresenter class", function(){ 

    var model = sinon.fake();
    helpScreenPresenter.setupModel(model);
    expect(helpScreenPresenter.model).to.be.equal(model);

  });

  after(function () {
    sinon.restore();
  });
  
});
