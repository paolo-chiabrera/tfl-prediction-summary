import _ from 'lodash';

import main from './main';

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

  const stations = [];

  if (_.isArray(feed.ROOT.S) && !_.isEmpty(feed.ROOT.S)) {
    _.each(feed.ROOT.S, stationFeed => {
      const station = main.mapStation(stationFeed);
      if (_.isObject(station)) {
        stations.push(station);
      }
    });
  }

  return {
    lineCode: lineCode,
    datetime: datetime,
    stations: stations
  };
}
