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
});
