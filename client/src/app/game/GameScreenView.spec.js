import { GameScreenView } from './GameScreenView.js';

require('jsdom-global')()
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

var gameScreenView;
var div;

describe('GameScreenView', function() {

  before(function() {

    gameScreenView = new GameScreenView();
    div = gameScreenView.getView();

  });

  
  it("should getView() should return a div with id equals game-screen", function(){
    
    expect(div.id).to.equal("game-screen");

  })

  it("should getView() should return a div", function(){
    
    expect(div).have.id('game-screen')

  })

  it("show() should call appenChild once", function(){
    
    var appendChild = sinon.fake();
    sinon.replace(document.body, 'appendChild', appendChild);
    gameScreenView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sinon.fake();
    sinon.replace(document.body, 'removeChild', removeChild);
    gameScreenView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

  })

  after(function () {
    
    sinon.restore();

  });

  
});
