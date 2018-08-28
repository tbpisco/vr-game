import { FontSizeManagerUtil } from './FontSizeManagerUtil.js';

require('jsdom-global')();
var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
var expect = chai.expect;
var sinon = require('sinon');

describe('FontSizeManagerUtil', function() {

  var addEventListener = sinon.spy(window, 'addEventListener');
  var fontSizeManagerUtil = new FontSizeManagerUtil(document.body);

  it('should addEventListener be called three times', function() {

    expect(addEventListener).calledThrice;

  });

  it('should addEventListener be called with resize / orientationchange / deviceorientation', function() {

    expect(addEventListener).calledWith('resize');
    expect(addEventListener).calledWith('orientationchange');
    expect(addEventListener).calledWith('deviceorientation');
  
  });

  it('should addEventListener be called with updateFontSize method', function() {

    expect(addEventListener.args[0][1].name).to.equal(fontSizeManagerUtil.updateFontSize.bind(fontSizeManagerUtil).name);
  
  });

  it('should add font-size attribute to a div ', function() {

    expect(document.body).to.have.attr('style').match(/font-size/);
  
  });

  after(function () {
    sinon.restore();
  });
  
});
