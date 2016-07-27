import _ from 'lodash';

import main from './main';

/**
* [mapStation description]
* @param  {Object}
*/
export default function mapStation(station) {
  if (!_.isObject(station) || _.isEmpty(station)) {
    return null;
  }

  const attrs = station.$ || station;

  if (!_.isObject(attrs) || !_.isString(attrs.Code)) {
    return null;
  }

  const platforms = [];

  if (_.isArray(station.P) && !_.isEmpty(station.P)) {
    _.each(station.P, platformFeed => {
      const platform = main.mapPlatform(platformFeed);
      if (_.isObject(platform)) {
        platforms.push(platform);
      }
    });
  }

  return {
    name: attrs.N.replace('.', ''),
    stationCode: attrs.Code,
    platforms: platforms
  };
}
