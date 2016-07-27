import {expect} from 'chai';
import sinon from 'sinon';
import _ from 'lodash';

import mapStation from '../../lib/modules/mapStation';
import main from '../../lib/modules/main';

import predictionSummaryParsedMock from '../mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from '../mocks/prediction-summary-mapped.b.mock';

describe('mapStation', function () {
  it('should be defined', function () {
    expect(mapStation).to.be.a('function');
  });

  it('should return null if called with no arguments', function () {
    const station = mapStation();

    expect(station).to.eql(null);
  });

  it('should return null if called without an invalid argument', function () {
    const station = mapStation(null);

    expect(station).to.eql(null);
  });

  it('should return null if called with an empty Object', function () {
    const station = mapStation({});

    expect(station).to.eql(null);
  });

  it('should return null if called with an Object without invalid attributes', function () {
    const station = mapStation({
      $: null
    });

    expect(station).to.eql(null);
  });

  it('should return null if called with an Object without attributes', function () {
    const station = mapStation({
      $: {}
    });

    expect(station).to.eql(null);
  });

  it('should return the mapped Station Object with empty platforms, given no platforms', function () {
    const station = mapStation({
      $: predictionSummaryParsedMock.ROOT.S[0].$,
      P: []
    });

    const expected = _.clone(predictionSummaryMappedMock.stations[0]);
    expected.platforms = [];

    expect(station).to.eql(expected);
  });

  it('should return the mapped Station Object with empty platforms, given wrong platforms', sinon.test(function () {
    const mp = this.stub(main, 'mapPlatform', () => {
      return null;
    });

    const station = mapStation(predictionSummaryParsedMock.ROOT.S[0]);

    const expected = _.clone(predictionSummaryMappedMock.stations[0]);
    expected.platforms = [];

    expect(station).to.eql(expected);

    mp.restore();
  }));

  it('should return the mapped Station Object correctly', function () {
    const station = mapStation(predictionSummaryParsedMock.ROOT.S[0]);

    expect(station).to.eql(predictionSummaryMappedMock.stations[0]);
  });
});
