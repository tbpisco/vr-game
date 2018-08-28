import { TaskbarView } from './TaskbarView.js';

require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var taskbarView;
var div;

describe('TaskbarView', function() {

  before(function() {

    var sinon = require('sinon');
    taskbarView = new TaskbarView();
    div = taskbarView.view;

  });

  it("show() should call appenChild once", function(){
    
    var appendChild = sinon.fake();
    sinon.replace(document.body, 'appendChild', appendChild);
    taskbarView.show(document.body);

    expect(taskbarView.container).to.equal(document.body);
    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sinon.fake();
    sinon.replace(document.body, 'removeChild', removeChild);
    taskbarView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

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

  after(function () {
    sinon.restore();
  });
  
});
