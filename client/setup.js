var jsdom = require('jsdom-global')();

var chai = require('chai');
chai.use(require('chai-dom'));
chai.use(require('sinon-chai'));
global.expect = chai.expect;
global.sinon = require('sinon');
global.sandbox = global.sinon.sandbox.create();
