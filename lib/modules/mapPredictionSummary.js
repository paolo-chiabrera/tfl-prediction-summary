import _ from 'lodash';

import mapStation from './mapStation';

/**
* [mapStation description]
* @param  {Object}
*/
export default function mapPredictionSummary(feed, lineCode = null) {
  if (!_.isObject(feed)) {
    throw new Error('feed is not an Object');
  }

  if (!_.isObject(feed.ROOT)) {
    throw new Error('ROOT is not an Object');
  }

  if (!_.isArray(feed.ROOT.S)) {
    throw new Error('feed.ROOT.S is not an Array');
  }

  let datetime = new Date(feed.ROOT.Time.$.TimeStamp);

  datetime = datetime.toISOString();

  return {
    lineCode: lineCode,
    datetime: datetime,
    stations: (_.size(feed.ROOT.S) <= 0) ? [] : _.map(feed.ROOT.S, mapStation)
  };
}
