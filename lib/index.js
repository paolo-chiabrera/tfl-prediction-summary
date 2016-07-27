import memoize from 'memoizee';
import Q from 'q';
import _ from 'lodash';

import main from './modules/main';

/**
 * [TflPredictionSummary description]
 */
export default class TflPredictionSummary {
  constructor() {
    this._lines = ['B', 'C', 'CI', 'D', 'H', 'J', 'M', 'N', 'P', 'V', 'W'];

    this.getPredictionSummaryByLine = memoize(this._getPredictionSummaryByLine.bind(this), {
      length: 1,
      maxAge: 30000,
      preFetch: 0.1,
      primitive: true,
      promise: true
    });
  }

  getLines() {
    return this._lines;
  }

  setLines(lines) {
    if (_.isArray(lines) && !_.isEmpty(lines)) {
      this._lines = lines;
    }
  }

  getPredictionSummary(lineCode) {
    if (_.isString(lineCode) && !_.isEmpty(lineCode)) {
      return this.getPredictionSummaryByLine(lineCode);
    }

    return this._getAllPredictionSummaries();
  }

  // private methods

  _getAllPredictionSummaries() {
    return Q.all(_.map(this.getLines(), lineCode => {
      return this.getPredictionSummaryByLine(lineCode);
    }));
  }

  _getPredictionSummaryByLine(lineCode = null) {
    const deferred = Q.defer();

    main.loadPredictionSummaryXML(lineCode, (err, feed) => {
      if (err) {
        deferred.reject(err);
        return;
      }

      try {
        const result = main.mapPredictionSummary(feed, lineCode);
        deferred.resolve(result);
      } catch (e) {
        deferred.reject(e);
      }
    });

    return deferred.promise;
  }
}
