import memoize from 'memoizee';
import Q from 'q';

import modules from './modules/main';

/**
 * [TflPredictionSummary description]
 */
export default class TflPredictionSummary {
  constructor() {
    this.getPredictionSummary = memoize(this._getPredictionSummary.bind(this), {
      maxAge: 30000,
      preFetch: 0.1,
      primitive: true,
      promise: 'then'
    });
  }

  _getPredictionSummary(lineCode = null) {
    const deferred = Q.defer();

    modules.loadPredictionSummaryXML(lineCode, (err, feed) => {
      if (err) {
        deferred.reject(err);
        return;
      }

      try {
        const result = modules.mapPredictionSummary(feed, lineCode);
        deferred.resolve(result);
      } catch (e) {
        deferred.reject(e);
      }
    });

    return deferred.promise;
  }
}
