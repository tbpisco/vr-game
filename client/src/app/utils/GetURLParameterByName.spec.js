import { GetURLParameterByName } from './GetURLParameterByName.js';

var expect = require('chai').expect;

var url = "http://localhost:8080/index.html?vr=true";
var url_1 = "http://localhost:8080/index.html";
var url_2 = "http://localhost:8080/index.html?vr=undefined";
var url_3 = "http://localhost:8080/index.html?vr=null";
var url_4 = "http://localhost:8080/index.html?vr=";
var url_5 = "http://localhost:8080/index.html?vr=true&vr=false";

describe('GetURLParameterByName', function() {

  it('should get the value of parameter', function() {
    
    expect(GetURLParameterByName.get("vr", url)).to.equal("true");
  
  });

  it('should return null when there is no parameter', function() {
    
    expect(GetURLParameterByName.get("vr", url_1)).to.be.null;
  
  });

  it('should return empty string when there is no value', function() {
    
    expect(GetURLParameterByName.get("vr", url_2)).to.equal("");
    expect(GetURLParameterByName.get("vr", url_3)).to.equal("");
    expect(GetURLParameterByName.get("vr", url_4)).to.equal("");
  
  });

  it('should return first value when there is the same parameter twice', function() {
    
    expect(GetURLParameterByName.get("vr", url_5)).to.equal("true");
    expect(GetURLParameterByName.get("vr", url_5)).to.not.equal("false");
  
  });
  
});
