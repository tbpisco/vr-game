import { GameScreenPresenter } from './GameScreenPresenter';

var gameScreenPresenter;
var gameScreenViewElement;


describe('GameScreenPresenter', function() {

  before(function() {

    gameScreenViewElement = {};
    gameScreenViewElement.view = document.createElement("div");
    gameScreenViewElement.getView = function(){};
    gameScreenViewElement.show = function(){};
    
    gameScreenPresenter = new GameScreenPresenter(gameScreenViewElement);

  });

  
  it("should gameScreenPresenter.view be equal element received on GameScreenPresenter() constructor", function(){
    
    expect(gameScreenPresenter.view).to.equal(gameScreenViewElement);

  })

  it("setupModel()", function(){
    
    var model = { getValue : function(){} };

    var taskbarSetupModel = sandbox.stub(gameScreenPresenter.taskbar, 'setupModel');
    var vrGlassSetupModel = sandbox.stub(gameScreenPresenter.vrGlass, 'setupModel');
    var sceneSetupModel = sandbox.stub(gameScreenPresenter.scene, 'setupModel');
    var show = sandbox.stub(gameScreenPresenter.view, 'show');

    gameScreenPresenter.setupModel(model);

    expect(taskbarSetupModel).calledOnce;
    expect(vrGlassSetupModel).calledOnce;
    expect(sceneSetupModel).calledOnce;

    expect(taskbarSetupModel).calledWith(model);
    expect(vrGlassSetupModel).calledWith(model);
    expect(sceneSetupModel).calledWith(model);

    expect(show).calledOnce;

    sandbox.restore();

  })

});
