import { VrScreenPresenter } from './VrScreenPresenter';

require('jsdom-global')();
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

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
   
    var show = sinon.spy(vrScreenViewElement, "show");

    vrScreenPresenter.openScreen();
    
    expect(show).calledOnce;

  })

  it("should setupModel() creates a model object reference inside this vrScreenPresenter class", function(){ 

    var model = sinon.fake();
    var addActionMode = sinon.spy(vrScreenViewElement, "addActionMode");

    vrScreenPresenter.setupModel(model);

    expect(vrScreenPresenter.model).to.be.equal(model);
    expect(addActionMode).calledOnce;

  });

  it("should closeScreen() call hide method from view", function(){ 

    var hide = sinon.spy(vrScreenViewElement, "hide");

    var event = sinon.fake();
    event.stopPropagation = function(){};
    
    var stopPropagation = sinon.fake();
    sinon.replace(event, 'stopPropagation', stopPropagation);

    vrScreenPresenter.closeScreen(event);
    expect(hide).calledOnce;
    expect(stopPropagation).calledOnce;

  })

  after(function () {
    sinon.restore();
  });
  
});
