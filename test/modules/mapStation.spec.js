import {expect} from 'chai';

import mapStation from '../../lib/modules/mapStation';

import predictionSummaryParsedMock from '../mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from '../mocks/prediction-summary-mapped.b.mock';

describe('mapStation', function () {
  it('should be defined', function () {
    expect(mapStation).to.be.a('function');
  });

  it('should return an empty Object if called with no arguments', function () {
    const station = mapStation();

    expect(station).to.eql({});
  });

  it('should return an empty Object if called without an invalid argument', function () {
    const station = mapStation(null);

    expect(station).to.eql({});
  });

  it('should return an empty Object if called with an empty Object', function () {
    const station = mapStation({});

    expect(station).to.eql({});
  });

  it('should return an empty Object if called with an Object without attributes', function () {
    const station = mapStation({
      $: {}
    });

    expect(station).to.eql({});
  });

  it('should return the mapped Station Object correctly', function () {
    const station = mapStation(predictionSummaryParsedMock.ROOT.S[0]);

    expect(station).to.eql(predictionSummaryMappedMock.stations[0]);
  });
});
