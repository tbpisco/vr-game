import { GetURLParameterByName } from './GetURLParameterByName.js';

var url = "http://localhost:8080/index.html?vr=true";
var url_1 = "http://localhost:8080/index.html";
var url_2 = "http://localhost:8080/index.html?vr=undefined";
var url_3 = "http://localhost:8080/index.html?vr=null";
var url_4 = "http://localhost:8080/index.html?vr=";
var url_5 = "http://localhost:8080/index.html?vr=true&vr=false";
var url_6 = "http://localhost:8080/index.html?vr=null&vr=null";
var url_7 = "http://localhost:8080/index.html?vr=null&vr=undefined";
var url_8 = "http://localhost:8080/index.html?vr=&vr=";
var url_9 = "http://localhost:8080/index.html?name=Ada+Lovelace+%26+Margaret+Hamilton";

describe('GetURLParameterByName', function() {

  it('should get the value of parameter', function() {
    
    expect(GetURLParameterByName.get("vr", url)).to.equal("true");
  
  });

  it('should return null when there is no parameter', function() {
    
    expect(GetURLParameterByName.get("vr", url_1)).to.be.null;
  
  });

  it('should return null when the arguments are invalid', function() {
    
    expect(GetURLParameterByName.get()).to.be.null;
  
  });

  it('should return empty string when there is no value', function() {
    
    expect(GetURLParameterByName.get("vr", url_4)).to.equal("");
    expect(GetURLParameterByName.get("vr", url_8)).to.equal("");
  
  });

  it('should return empty string when the parameter is equals undefined or null', function() {
    
    expect(GetURLParameterByName.get("vr", url_6)).to.equal("");
    expect(GetURLParameterByName.get("vr", url_7)).to.equal("");
    expect(GetURLParameterByName.get("vr", url_2)).to.equal("");
    expect(GetURLParameterByName.get("vr", url_3)).to.equal("");
  
  });

  it('should return first value when there is the same parameter twice', function() {
    
    expect(GetURLParameterByName.get("vr", url_5)).to.equal("true");
    expect(GetURLParameterByName.get("vr", url_5)).to.not.equal("false");
  
  });

  it('should return decoded values', function() {
    
    expect(GetURLParameterByName.get("name", url_9)).to.equal("Ada Lovelace & Margaret Hamilton");
  
  });
  
  it('should throw an Error when instantiate GetURLParameterByName class', function() {
    
    expect(function(){new GetURLParameterByName()}).to.throw(Error);
    expect(function(){new GetURLParameterByName()}).to.throw("GetURLParameterByName can not be instantiated.");
  
  });
  
});
