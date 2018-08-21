import { SceneView } from './SceneView.js';

require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var sceneView;
var div;

describe('SceneView', function() {

  before(function() {

    sceneView = new SceneView();
    sceneView.init(document.body);
    div = sceneView.getView();

  });

  
  it("should getView() should return a div with id equals scene", function(){
    
    expect(div.id).to.equal("scene");

  })

  it("should sceneView.holder be equal element received on sceneView.init() call", function(){
    
    expect(sceneView.holder).to.equal(document.body);

  })

  it("should getView() should return a div", function(){
    
    expect(div).have.id('scene')

  })

  it("show() should call appenChild once", function(){
    
    var appendChild = sinon.fake();
    sinon.replace(sceneView.holder, 'appendChild', appendChild);
    sceneView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sinon.fake();
    sinon.replace(sceneView.holder, 'removeChild', removeChild);
    sceneView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

  })

  after(function () {
    
    sinon.restore();

  });

  
});
