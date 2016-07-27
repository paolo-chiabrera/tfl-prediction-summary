import {expect} from 'chai';
import sinon from 'sinon';
import _ from 'lodash';

import TflPredictionSummary from '../lib/index';
import modules from '../lib/modules/main';

import predictionSummaryParsedMock from './mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from './mocks/prediction-summary-mapped.b.mock';

describe('tfl-prediction-summary', function () {
  const tflPredictionSummary = new TflPredictionSummary();

  let loadPredictionSummaryXML = null;

  beforeEach(function () {
    loadPredictionSummaryXML = sinon.stub(modules, 'loadPredictionSummaryXML', (lineCode, callback) => {
      callback(null, predictionSummaryParsedMock);
    });
  });

  afterEach(function () {
    loadPredictionSummaryXML.restore();
  });

  it('should be a valid Object', function () {
    expect(tflPredictionSummary).to.be.an('object');
  });

  describe('getLines', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary.getLines).to.be.a('function');
    });

    it('should return the lines', function () {
      expect(tflPredictionSummary.getLines()).to.eql(['B', 'C', 'CI', 'D', 'H', 'J', 'M', 'N', 'P', 'V', 'W']);
    });
  });

  describe('setLines', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary.setLines).to.be.a('function');
    });

    it('should not set the lines', function () {
      const tflPredictionSummary = new TflPredictionSummary();
      const newLines = [];

      tflPredictionSummary.setLines(newLines);

      expect(tflPredictionSummary.getLines()).to.not.eql(newLines);
    });

    it('should set the lines', function () {
      const tflPredictionSummary = new TflPredictionSummary();
      const newLines = ['X', 'Y', 'Z'];

      tflPredictionSummary.setLines(newLines);

      expect(tflPredictionSummary.getLines()).to.eql(newLines);
    });
  });

  describe('_getPredictionSummaryByLine', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary._getPredictionSummaryByLine).to.be.a('function');
    });

    it('should raise an error if no lineCode is passed', sinon.test(function (done) {
      const success = this.spy();

      loadPredictionSummaryXML.restore();
      loadPredictionSummaryXML = this.spy(modules, 'loadPredictionSummaryXML');

      tflPredictionSummary._getPredictionSummaryByLine().then(success, (err) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(success);
          expect(err).to.eql('lineCode is not a valid String');
        } catch (e) {
          done(e);
          return;
        }

        done();
      });
    }));

    it('should raised an error if something fails with loadPredictionSummaryXML', sinon.test(function (done) {
      const success = this.spy();
      const fakeError = new Error('fake error');

      loadPredictionSummaryXML.restore();
      loadPredictionSummaryXML = this.stub(modules, 'loadPredictionSummaryXML', (lineCode, callback) => {
        callback(fakeError);
      });

      tflPredictionSummary._getPredictionSummaryByLine('B').then(success, (err) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(success);
          expect(err).to.eql(fakeError);
        } catch (e) {
          done(e);
          return;
        }

        done();
      });
    }));

    it('should raised an error if something fails with mapPredictionSummary', sinon.test(function (done) {
      const success = this.spy();
      const fakeError = new Error('fake error');

      const mapPredictionSummary = this.stub(modules, 'mapPredictionSummary', (lineCode) => {
        throw fakeError;
      });

      tflPredictionSummary._getPredictionSummaryByLine('B').then(success, (err) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.calledOnce(mapPredictionSummary);
          sinon.assert.notCalled(success);
          expect(err).to.eql(fakeError);
        } catch (e) {
          done(e);
          return;
        }

        done();
      });
    }));

    it('should resolve corretly', sinon.test(function (done) {
      const fail = this.spy();

      tflPredictionSummary._getPredictionSummaryByLine('B').then((res) => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(fail);
          expect(res).to.eql(predictionSummaryMappedMock);
        } catch (e) {
          done(e);
          return;
        }

        done();
      }, fail);
    }));
  });

  describe('getPredictionSummaryByLine', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary.getPredictionSummaryByLine).to.be.a('function');
    });

    it('should leverage the memoize cache', sinon.test(function (done) {
      const fail = this.spy();
      const fail2 = this.spy();

      tflPredictionSummary.getPredictionSummaryByLine('B').then(res => {
        try {
          sinon.assert.calledOnce(loadPredictionSummaryXML);
          sinon.assert.notCalled(fail);
          expect(res).to.eql(predictionSummaryMappedMock);
        } catch (e) {
          done(e);
          return;
        }

        tflPredictionSummary.getPredictionSummaryByLine('B').then(res2 => {
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

  describe('_getAllPredictionSummaries', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary._getAllPredictionSummaries).to.be.a('function');
    });

    it('should resolve corretly', sinon.test(function () {
      const fail = this.spy();

      const lines = tflPredictionSummary.getLines();

      tflPredictionSummary._getAllPredictionSummaries().then((res) => {
        try {
          const calls = sinon.assert.callCount(loadPredictionSummaryXML);

          sinon.assert.notCalled(fail);
          expect(calls).to.equal(lines.length);
          expect(res.length).to.equal(lines.length);
          expect(res[0]).to.eql(predictionSummaryMappedMock);
        } catch (e) {
          done(e);
          return;
        }

        done();
      }, fail);
    }));
  });

  describe('getPredictionSummary', function () {
    it('should be defined', function () {
      expect(tflPredictionSummary.getPredictionSummary).to.be.a('function');
    });

    it('should call _getAllPredictionSummaries', sinon.test(function (done) {
      const fail = this.spy();

      const lines = tflPredictionSummary.getLines();

      const _getAllPredictionSummaries = this.spy(tflPredictionSummary, '_getAllPredictionSummaries');

      const expected = _.map(lines, lineCode => {
        const line = _.clone(predictionSummaryMappedMock);
        line.lineCode = lineCode;
        return line;
      });

      tflPredictionSummary.getPredictionSummary().then(res => {
        try {
          sinon.assert.calledOnce(_getAllPredictionSummaries);
          sinon.assert.notCalled(fail);
          expect(res.length).to.eql(lines.length);
          expect(res).to.eql(expected);
        } catch (e) {
          done(e);
          return;
        }

        done();
      }, fail);
    }));

    it('should call getPredictionSummaryByLine', sinon.test(function (done) {
      const fail = this.spy();

      const getPredictionSummaryByLine = this.spy(tflPredictionSummary, 'getPredictionSummaryByLine');

      tflPredictionSummary.getPredictionSummary('B').then(res => {
        try {
          sinon.assert.calledOnce(getPredictionSummaryByLine);
          sinon.assert.notCalled(fail);
          expect(res).to.eql(predictionSummaryMappedMock);
        } catch (e) {
          done(e);
          return;
        }

        done();
      }, fail);
    }));
  });
});
