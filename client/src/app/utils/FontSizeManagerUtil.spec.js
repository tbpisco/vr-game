import { FontSizeManagerUtil } from './FontSizeManagerUtil.js';


describe('FontSizeManagerUtil', function() {

  var addEventListener;
  var fontSizeManagerUtil;
  
  beforeEach(function() {

    addEventListener = sandbox.spy(window, 'addEventListener');
    fontSizeManagerUtil = new FontSizeManagerUtil(document.body);

  });

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

  afterEach(function () {
    sandbox.restore();
  });
  
});
