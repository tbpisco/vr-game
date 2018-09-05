import { ScenePresenter } from './ScenePresenter.js';

var scenePresenter;
var sceneViewElement = document.createElement("div");
sceneViewElement.init = function(){};
sceneViewElement.show = function(){};
sceneViewElement.updateSceneSize = function() {};
var holder = document.createElement("div");

describe('ScenePresenter', function() {

  before(function() {
    
    scenePresenter = new ScenePresenter(sceneViewElement, holder);

  });

  
  it("should scenePresenter.view be equal element received on ScenePresenter() constructor", function(){
    
    expect(scenePresenter.view).to.equal(sceneViewElement);

  })

  it("should scenePresenter.holder be equal element received on ScenePresenter() constructor", function(){
    
    expect(scenePresenter.holder).to.equal(holder);

  })

  it("setupModel() should call init once", function(){
    
    var init = sandbox.stub(scenePresenter.view, 'init');
    var show = sandbox.stub(scenePresenter.view, 'show');
    var resizeWindow = sandbox.stub( scenePresenter , 'resizeWindow');
    var addEvents = sandbox.stub( scenePresenter , 'addEvents');
   // var updateSceneSize = sandbox.spy(scenePresenter.view , 'updateSceneSize');

    scenePresenter.setupModel();

    expect(init).calledOnce;
    expect(init).calledWith(scenePresenter.holder);
    expect(show).calledOnce;
    expect(resizeWindow).calledOnce;
    expect(addEvents).calledOnce;
   // expect(updateSceneSize).calledAfter(resizeWindow);
   // expect(updateSceneSize).calledOnce;

    sandbox.restore();

  })

  it("resizeWindow() should call updateSceneSize once", function(){
    
    var updateSceneSize = sandbox.spy(scenePresenter.view , 'updateSceneSize');
    scenePresenter.resizeWindow();

    expect(updateSceneSize).calledOnce;

    sandbox.restore();

  })
  
});
