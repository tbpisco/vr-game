import { GameScreenView } from './GameScreenView.js';

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
    
    expect(div).have.id('game-screen');

  })

  it("show() should call appenChild once", function(){
    
    var appendChild = sandbox.spy(document.body, 'appendChild');
    gameScreenView.show();

    expect(appendChild).calledOnce;
    expect(appendChild).calledWith(div);

    sandbox.restore();

  })

  it("hide() should call removeChild once", function(){
    
    var removeChild = sandbox.spy(document.body, 'removeChild');
    gameScreenView.hide();

    expect(removeChild).calledOnce;
    expect(removeChild).calledWith(div);

    sandbox.restore();

  })

});
