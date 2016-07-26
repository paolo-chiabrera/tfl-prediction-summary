import {expect} from 'chai';
import sinon from 'sinon';

import TflPredictionSummary from '../lib/index';
import modules from '../lib/modules/main';

import predictionSummaryParsedMock from './mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from './mocks/prediction-summary-mapped.b.mock';

describe('tfl-prediction-summary', function () {
  const tflPredictionSummary = new TflPredictionSummary();

  it('should be a valid Object', function () {
    expect(tflPredictionSummary).to.be.an('object');
  });

  describe('_getPredictionSummary', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary._getPredictionSummary).to.be.a('function');
    });

    it('should raise an error if no lineCode is passed', sinon.test(function (done) {
      const success = this.spy();
      const loadPredictionSummaryXML = this.spy(modules, 'loadPredictionSummaryXML');

      tflPredictionSummary._getPredictionSummary().then(success, (err) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(success);
          expect(err).to.eql('lineCode is not a valid String');
        } catch (e) {
          done(e);
          return;
        }

        loadPredictionSummaryXML.restore();

        done();
      });
    }));

    it('should raised an error if something fails with loadPredictionSummaryXML', sinon.test(function (done) {
      const success = this.spy();
      const fakeError = new Error('fake error');

      const loadPredictionSummaryXML = this.stub(modules, 'loadPredictionSummaryXML', (lineCode, callback) => {
        callback(fakeError);
      });

      tflPredictionSummary._getPredictionSummary('B').then(success, (err) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(success);
          expect(err).to.eql(fakeError);
        } catch (e) {
          done(e);
          return;
        }

        loadPredictionSummaryXML.restore();

        done();
      });
    }));

    it('should raised an error if something fails with mapPredictionSummary', sinon.test(function (done) {
      const success = this.spy();
      const fakeError = new Error('fake error');

      const loadPredictionSummaryXML = this.stub(modules, 'loadPredictionSummaryXML', (lineCode, callback) => {
        callback(null, predictionSummaryParsedMock);
      });

      const mapPredictionSummary = this.stub(modules, 'mapPredictionSummary', (lineCode) => {
        throw fakeError;
      });

      tflPredictionSummary._getPredictionSummary('B').then(success, (err) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.calledOnce(mapPredictionSummary);
          sinon.assert.notCalled(success);
          expect(err).to.eql(fakeError);
        } catch (e) {
          done(e);
          return;
        }

        mapPredictionSummary.restore();

        done();
      });
    }));

    it('should resolve corretly', sinon.test(function (done) {
      const fail = this.spy();

      const loadPredictionSummaryXML = this.stub(modules, 'loadPredictionSummaryXML', (lineCode, callback) => {
        callback(null, predictionSummaryParsedMock);
      });

      tflPredictionSummary._getPredictionSummary('B').then((res) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(fail);
          expect(res).to.eql(predictionSummaryMappedMock);
        } catch (e) {
          done(e);
          return;
        }

        loadPredictionSummaryXML.restore();

        done();
      }, fail);
    }));
  });

  describe('getPredictionSummary', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary.getPredictionSummary).to.be.a('function');
    });

    it('should leverage the memoize cache', sinon.test(function (done) {
      const fail = this.spy();
      const fail2 = this.spy();

      const loadPredictionSummaryXML = this.stub(modules, 'loadPredictionSummaryXML', (lineCode, callback) => {
        callback(null, predictionSummaryParsedMock);
      });

      tflPredictionSummary.getPredictionSummary('B').then(res => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(fail);
          expect(res).to.eql(predictionSummaryMappedMock);
        } catch (e) {
          done(e);
          return;
        }

        tflPredictionSummary.getPredictionSummary('B').then(res2 => {
          try {
            sinon.assert.calledOnce(loadPredictionSummaryXML);
            sinon.assert.notCalled(fail2);
            expect(res2).to.eql(predictionSummaryMappedMock);
          } catch (e) {
            done(e);
            return;
          }

          done();
        }, fail2);
      }, fail);
    }));
  });
});
