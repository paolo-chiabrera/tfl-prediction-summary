import {expect} from 'chai';

import _ from 'lodash';

import mapPlatform from '../../lib/modules/mapPlatform';

import predictionSummaryParsedMock from '../mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from '../mocks/prediction-summary-mapped.b.mock';

describe('mapPlatform', function () {
  it('should be defined', function () {
    expect(mapPlatform).to.be.a('function');
  });

  it('should return an empty Object if called with no arguments', function () {
    const platform = mapPlatform();

    expect(platform).to.eql({});
  });

  it('should return an empty Object if called without an invalid argument', function () {
    const platform = mapPlatform(null);

    expect(platform).to.eql({});
  });

  it('should return an empty Object if called with an empty Object', function () {
    const platform = mapPlatform({});

    expect(platform).to.eql({});
  });

  it('should return the mapped Platform Object correctly, without passing the stationCode', function () {
    const expected = _.clone(predictionSummaryMappedMock.stations[0].platforms[0]);
    expected.station = null;

    const platform = mapPlatform(predictionSummaryParsedMock.ROOT.S[0].P[0]);

    expect(platform).to.eql(expected);
  });

  it('should return the mapped Platform Object correctly', function () {
    const platform = mapPlatform(predictionSummaryParsedMock.ROOT.S[0].P[0], predictionSummaryParsedMock.ROOT.S[0].$.Code);

    expect(platform).to.eql(predictionSummaryMappedMock.stations[0].platforms[0]);
  });
});
