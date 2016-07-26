import {expect} from 'chai';

import mapTrain from '../../lib/modules/mapTrain';

import predictionSummaryParsedMock from '../mocks/prediction-summary-parsed.b.mock';
import predictionSummaryMappedMock from '../mocks/prediction-summary-mapped.b.mock';

describe('mapTrain', function () {
  it('should be defined', function () {
    expect(mapTrain).to.be.a('function');
  });

  it('should return an empty Object if called with no arguments', function () {
    const train = mapTrain();

    expect(train).to.eql({});
  });

  it('should return an empty Object if called without an invalid argument', function () {
    const train = mapTrain(null);

    expect(train).to.eql({});
  });

  it('should return an empty Object if called with an empty Object', function () {
    const train = mapTrain({});

    expect(train).to.eql({});
  });

  it('should return an empty Object if called with an Object with invalid attributes', function () {
    const train = mapTrain({
      $: null
    });

    expect(train).to.eql({});
  });

  it('should return an empty Object if called with an Object without attributes', function () {
    const train = mapTrain({
      $: {}
    });

    expect(train).to.eql({});
  });

  it('should return the mapped Train Object correctly', function () {
    const train = mapTrain(predictionSummaryParsedMock.ROOT.S[0].P[0].T[0]);

    expect(train).to.eql(predictionSummaryMappedMock.stations[0].platforms[0].trains[0]);
  });
});
