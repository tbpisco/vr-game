import { TaskbarPresenter } from './TaskbarPresenter';

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

    var addActionVr = sandbox.spy(taskbarViewElement, "addActionVr");
    var addActionHelp = sandbox.spy(taskbarViewElement, "addActionHelp");
    var show = sandbox.spy(taskbarViewElement, "show");

    taskbarPresenter.addTaskbar();

    expect(addActionVr).calledOnce;
    expect(addActionHelp).calledOnce;
    expect(show).calledOnce;

    sandbox.restore();

  })

  it("should setupModel() creates a model object reference inside this taskbarPresenter class", function(){ 

    var model = { getValue: function() {} };
    var addTaskbar = sandbox.spy(taskbarPresenter, "addTaskbar");
    taskbarPresenter.setupModel(model);
    expect(taskbarPresenter.model).to.be.equal(model);
    expect(addTaskbar).calledOnce;

    sandbox.restore();

  });

  it("should hide() call hide method from view", function(){ 

    var hide = sandbox.spy(taskbarViewElement, "hide")
    taskbarPresenter.hide();

    expect(hide).calledOnce;

    sandbox.restore();

  })
  
});
