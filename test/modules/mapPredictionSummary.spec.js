import {expect} from 'chai';
import sinon from 'sinon';

import _ from 'lodash';

import mapPredictionSummary from '../../lib/modules/mapPredictionSummary';

import predictionSummaryParsedMock from '../mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from '../mocks/prediction-summary-mapped.b.mock';

describe('mapPredictionSummary', function () {
  it('should be defined', function () {
    expect(mapPredictionSummary).to.be.a('function');
  });

  it('should raise the error to the callback: feed is not an Object', function () {
    const feed = '';

    const err = new Error('feed is not an Object');

    try {
      mapPredictionSummary(feed);
    } catch (e) {
      expect(e).to.eql(err);
    }
  });

  it('should raise the error to the callback: ROOT is not an Object', function () {
    const feed = {};

    const err = new Error('ROOT is not an Object');

    try {
      mapPredictionSummary(feed);
    } catch (e) {
      expect(e).to.eql(err);
    }
  });

  it('should raise the error to the callback: feed.ROOT.S is not an Array', function () {
    const feed = {
      ROOT: {}
    };

    const err = new Error('feed.ROOT.S is not an Array');

    try {
      mapPredictionSummary(feed);
    } catch (e) {
      expect(e).to.eql(err);
    }
  });

  it('should map an empty Array', function () {
    const testDate = new Date();

    const feed = {
      ROOT: {
        S: [],
        Time: {
          $: {
            TimeStamp: testDate
          }
        }
      }
    };

    const feedMapped = {
      datetime: testDate.toISOString(),
      stations: []
    };

    const result = mapPredictionSummary(feed);

    expect(result).to.eql(feedMapped);
  });

  it('should catch any error from lodash mapping', sinon.test(function () {
    const testDate = new Date();

    const fakeErr = new Error('fake error');

    const map = this.stub(_, 'map', () => {
      throw fakeErr;
    });

    const feed = {
      ROOT: {
        S: [
          {}
        ],
        Time: {
          $: {
            TimeStamp: testDate
          }
        }
      }
    };

    try {
      mapPredictionSummary(feed);
    } catch (e) {
      expect(e).to.eql(fakeErr);
      map.restore();
    }
  }));

  it('should map the Prediction Summary correctly', function () {
    const result = mapPredictionSummary(predictionSummaryParsedMock);

    expect(result).to.eql(predictionSummaryMappedMock);
  });
});
