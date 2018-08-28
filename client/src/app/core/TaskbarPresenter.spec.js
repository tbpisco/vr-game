import { TaskbarPresenter } from './TaskbarPresenter';

require('jsdom-global')();
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var taskbarPresenter;
var taskbarViewElement;

describe('TaskbarPresenter', function() {

  before(function() {

    taskbarViewElement = document.createElement("div");
    taskbarViewElement.addActionVr = function(){};
    taskbarViewElement.addActionHelp = function(){};
    taskbarViewElement.show = function(){};
    taskbarViewElement.hide = function(){};
    taskbarViewElement.toggleVR = function(){};
    taskbarViewElement.addTaskbar = function(){};

    taskbarPresenter = new TaskbarPresenter(taskbarViewElement, document.body);

  });
  
  
  it("should TaskbarPresenter constructor creates a view object reference inside this taskbarPresenter class", function(){ 

    expect(taskbarPresenter.view).to.be.equal(taskbarViewElement);

  });

  it("should TaskbarPresenter constructor creates a container object reference inside this taskbarPresenter class", function(){ 

    expect(taskbarPresenter.container).to.be.equal(document.body);

  });

  it("should addTaskbar() call view methods", function(){ 

    var addActionVr = sinon.spy(taskbarViewElement, "addActionVr");
    var addActionHelp = sinon.spy(taskbarViewElement, "addActionHelp");
    var show = sinon.spy(taskbarViewElement, "show");

    taskbarPresenter.addTaskbar();

    expect(addActionVr).calledOnce;
    expect(addActionHelp).calledOnce;
    expect(show).calledOnce;

  })

  it("should setupModel() creates a model object reference inside this taskbarPresenter class", function(){ 

    var model = sinon.fake();
    var addTaskbar = sinon.spy(taskbarPresenter, "addTaskbar");
    taskbarPresenter.setupModel(model);
    expect(taskbarPresenter.model).to.be.equal(model);
    expect(addTaskbar).calledOnce;

  });

  it("should hide() call hide method from view", function(){ 

    var hide = sinon.spy(taskbarViewElement, "hide");

    taskbarPresenter.hide();
    expect(hide).calledOnce;

  })

  after(function () {
    sinon.restore();
  });
  
});
