import {expect} from 'chai';
import sinon from 'sinon';
import _ from 'lodash';

import mapPlatform from '../../lib/modules/mapPlatform';
import main from '../../lib/modules/main';

import predictionSummaryParsedMock from '../mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from '../mocks/prediction-summary-mapped.b.mock';

describe('mapPlatform', function () {
  it('should be defined', function () {
    expect(mapPlatform).to.be.a('function');
  });

  it('should return null if called with no arguments', function () {
    const platform = mapPlatform();

    expect(platform).to.eql(null);
  });

  it('should return null if called with an empty Object', function () {
    const platform = mapPlatform({});

    expect(platform).to.eql(null);
  });

  it('should return null if called with invalid attributes', function () {
    const platform = mapPlatform({
      $: null
    });

    expect(platform).to.eql(null);
  });

  it('should return null if called with empty attributes', function () {
    const platform = mapPlatform({
      $: {}
    });

    expect(platform).to.eql(null);
  });

  it('should return an empty array of trains', function () {
    const platformFeed = _.clone(predictionSummaryParsedMock.ROOT.S[0].P[0]);
    platformFeed.T = [];

    const expected = _.clone(predictionSummaryMappedMock.stations[0].platforms[0]);
    expected.trains = [];

    const platform = mapPlatform(platformFeed);

    expect(platform).to.eql(expected);
  });

  it('should return the mapped Platform Object with empty trains, given wrong trains', sinon.test(function () {
    const mapTrain = this.stub(main, 'mapTrain', () => {
      return null;
    });

    const platform = mapPlatform(predictionSummaryParsedMock.ROOT.S[0].P[0]);

    const expected = _.clone(predictionSummaryMappedMock.stations[0].platforms[0]);
    expected.trains = [];

    expect(platform).to.eql(expected);

    mapTrain.restore();
  }));

  it('should return the mapped Platform Object correctly', function () {
    const platform = mapPlatform(predictionSummaryParsedMock.ROOT.S[0].P[0]);

    expect(platform).to.eql(predictionSummaryMappedMock.stations[0].platforms[0]);
  });
});
