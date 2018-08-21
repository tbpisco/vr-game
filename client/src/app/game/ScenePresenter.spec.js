import { ScenePresenter } from './ScenePresenter.js';

require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var scenePresenter;
var sceneViewElement = document.createElement("div");
sceneViewElement.init = function(){};
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
    
    var init = sinon.fake();
    sinon.replace(scenePresenter.view, 'init', init);
    scenePresenter.setupModel();

    expect(init).calledOnce;
    expect(init).calledWith(scenePresenter.holder);

  })

  after(function () {
    
    sinon.restore();

  });

  
});
