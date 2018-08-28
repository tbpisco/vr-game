import { GameScreenPresenter } from './GameScreenPresenter';


require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var gameScreenPresenter;
var gameScreenViewElement;


describe('GameScreenPresenter', function() {

  before(function() {

    gameScreenViewElement = document.createElement("div");
    gameScreenViewElement.getView = function(){};
    gameScreenViewElement.show = function(){};
    
    gameScreenPresenter = new GameScreenPresenter(gameScreenViewElement);

  });

  
  it("should gameScreenPresenter.view be equal element received on GameScreenPresenter() constructor", function(){
    
    expect(gameScreenPresenter.view).to.equal(gameScreenViewElement);

  })

  it("setupModel()", function(){
    
    var model = sinon.fake();

    var taskbarSetupModel = sinon.fake();
    sinon.replace(gameScreenPresenter.taskbar, 'setupModel', taskbarSetupModel);
    var vrGlassSetupModel = sinon.fake();
    sinon.replace(gameScreenPresenter.vrGlass, 'setupModel', vrGlassSetupModel);
    var sceneSetupModel = sinon.fake();
    sinon.replace(gameScreenPresenter.scene, 'setupModel', sceneSetupModel);

    var show = sinon.fake();
    sinon.replace(gameScreenPresenter.view, 'show', show);

    gameScreenPresenter.setupModel(model);


    expect(taskbarSetupModel).calledOnce;
    expect(vrGlassSetupModel).calledOnce;
    expect(sceneSetupModel).calledOnce;

    expect(taskbarSetupModel).calledWith(model);
    expect(vrGlassSetupModel).calledWith(model);
    expect(sceneSetupModel).calledWith(model);

    expect(show).calledOnce;

  })

  after(function () {
    
    sinon.restore();

  });

  
});
