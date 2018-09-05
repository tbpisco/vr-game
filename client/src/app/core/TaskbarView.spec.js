import { TaskbarView } from './TaskbarView.js';

var taskbarView;
var div;

describe('TaskbarView', function() {

  before(function() {

    taskbarView = new TaskbarView();
    div = taskbarView.view;

  });

  it("show() should call appenChild once", function(){
    
    var appendChild = sandbox.spy(document.body, 'appendChild');
    taskbarView.show(document.body);

    expect(taskbarView.container).to.equal(document.body);
    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

    sandbox.restore();

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sandbox.spy(document.body, 'removeChild');
    taskbarView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

    sandbox.restore();

  })

  it("should view return a div with class equals 'taskbar'", function(){
    
    expect(taskbarView.view).have.class('taskbar');

  })

  it("should menuTools return a div with class equals 'taskbar'", function(){
    
    expect(taskbarView.menuTools).have.class('menu-mode');

  })

  it("should menuTools have two li elements", function(){
    
    expect(taskbarView.menuTools.querySelectorAll('li')).have.length(2);

  })

  it("should view dont have class vr", function(){

    expect(taskbarView.view).not.have.class('vr');

  })

  it("should view have class vr after toggleVR()", function(){

    taskbarView.toggleVR();
    expect(taskbarView.view).have.class('vr');

  })
  
});
