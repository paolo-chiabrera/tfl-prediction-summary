import {expect} from 'chai';
import sinon from 'sinon';

import needle from 'needle';

import loadPredictionSummaryXML from '../../lib/modules/loadPredictionSummaryXML';

describe('loadPredictionSummaryXML', function () {
  it('should be defined', function () {
    expect(loadPredictionSummaryXML).to.be.a('function');
  });

  it('should return if a callback is not passed', sinon.test(function () {
    const get = this.spy(needle, 'get');

    loadPredictionSummaryXML();

    sinon.assert.notCalled(get);
  }));

  it('should raise the error: lineCode is not a valid String', sinon.test(function () {
    const get = this.spy(needle, 'get');
    const cb = this.spy();

    loadPredictionSummaryXML(null, cb);

    sinon.assert.calledWith(cb, 'lineCode is not a valid String');
    sinon.assert.notCalled(get);
  }));

  it('should call needle.get and raise a generic error', sinon.test(function () {
    const cb = this.spy();

    const fakeErr = new Error('fake error');

    const get = this.stub(needle, 'get', (feedUrl, options, cb) => {
      cb(fakeErr);
    });

    loadPredictionSummaryXML('test', cb);

    sinon.assert.calledOnce(get);
    sinon.assert.calledOnce(cb);
    sinon.assert.calledWith(cb, fakeErr);
  }));

  it('should call needle.get and raise the error: wrong statusCode', sinon.test(function () {
    const cb = this.spy();

    const statusCode = 404;
    const errMsg = 'wrong statusCode ' + statusCode;

    const get = this.stub(needle, 'get', (feedUrl, options, cb) => {
      cb(null, {
        statusCode: statusCode
      });
    });

    loadPredictionSummaryXML('test', cb);

    sinon.assert.calledOnce(get);
    sinon.assert.calledOnce(cb);
    sinon.assert.calledWith(cb, errMsg);
  }));

  it('should call needle.get and succeed', sinon.test(function () {
    const cb = this.spy();

    const response = {
      statusCode: 200,
      body: '<test></test>'
    };

    const get = this.stub(needle, 'get', (feedUrl, options, cb) => {
      cb(null, response);
    });

    loadPredictionSummaryXML('test', cb);

    sinon.assert.calledOnce(get);
    sinon.assert.calledOnce(cb);
    sinon.assert.calledWith(cb, null, response.body);
  }));
});
