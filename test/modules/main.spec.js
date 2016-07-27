import {expect} from 'chai';

import util from '../../lib/modules/main';

describe('main', function () {
  it('should be defined', function () {
    expect(util).to.be.a('object');
  });

  it('should expose: loadPredictionSummaryXML', function () {
    expect(util.loadPredictionSummaryXML).to.be.a('function');
  });

  it('should expose: mapPredictionSummary', function () {
    expect(util.mapPredictionSummary).to.be.a('function');
  });

  it('should expose: mapStation', function () {
    expect(util.mapStation).to.be.a('function');
  });

  it('should expose: mapPlatform', function () {
    expect(util.mapPlatform).to.be.a('function');
  });

  it('should expose: mapTrain', function () {
    expect(util.mapTrain).to.be.a('function');
  });
});
