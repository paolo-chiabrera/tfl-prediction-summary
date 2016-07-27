import {expect} from 'chai';
import sinon from 'sinon';

import needle from 'needle';

import loadPredictionSummaryXML from '../../lib/modules/loadPredictionSummaryXML';

describe('loadPredictionSummaryXML', function () {
  it('should be defined', function () {
    expect(loadPredictionSummaryXML).to.be.a('function');
  });

  it('should return if a callback is not passed', sinon.test(function () {
    const get = sinon.stub(needle, 'get', (feedUrl, options, callback) => {
      callback(null, {});
    });

    loadPredictionSummaryXML();

    sinon.assert.notCalled(get);

    get.restore();
  }));

  it('should raise the error: lineCode is not a valid String', sinon.test(function (done) {
    const get = this.stub(needle, 'get', (feedUrl, options, callback) => {
      callback(null, {});
    });

    loadPredictionSummaryXML(null, err => {
      try {
        sinon.assert.notCalled(get);
        expect(err).to.equal('lineCode is not a valid String');
      } catch (e) {
        done(e);
        return;
      }

      get.restore();

      done();
    });
  }));

  it('should call needle.get and raise a generic error', sinon.test(function (done) {
    const fakeErr = new Error('fake error');

    const get = this.stub(needle, 'get', (feedUrl, options, cb) => {
      cb(fakeErr);
    });

    loadPredictionSummaryXML('test', err => {
      try {
        sinon.assert.calledOnce(get);
        expect(err).to.eql(fakeErr);
      } catch (e) {
        done(e);
        return;
      }

      get.restore();

      done();
    });
  }));

  it('should call needle.get and raise the error: wrong statusCode', sinon.test(function (done) {
    const statusCode = 404;
    const errMsg = 'wrong statusCode ' + statusCode;

    const get = this.stub(needle, 'get', (feedUrl, options, cb) => {
      cb(null, {
        statusCode: statusCode
      });
    });

    loadPredictionSummaryXML('test', err => {
      try {
        sinon.assert.calledOnce(get);
        expect(err).to.eql(errMsg);
      } catch (e) {
        done(e);
        return;
      }

      get.restore();

      done();
    });
  }));

  it('should call needle.get and succeed', sinon.test(function (done) {
    const response = {
      statusCode: 200,
      body: '<test></test>'
    };

    const get = this.stub(needle, 'get', (feedUrl, options, cb) => {
      cb(null, response);
    });

    loadPredictionSummaryXML('test', (err, res) => {
      try {
        sinon.assert.calledOnce(get);
        expect(err).to.eql(null);
        expect(res).to.eql(response.body);
      } catch (e) {
        done(e);
        return;
      }

      get.restore();

      done();
    });
  }));
});
