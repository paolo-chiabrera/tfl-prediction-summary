import _ from 'lodash';

import mapPlatform from './mapPlatform';

/**
* [mapStation description]
* @param  {Object}
*/
export default function mapStation(station) {
  if (!_.isObject(station) || _.isEmpty(station)) {
    return {};
  }

  const attrs = station.$;

  if (!_.isObject(attrs) || _.isEmpty(attrs)) {
    return {};
  }

  return {
    name: attrs.N.replace('.', ''),
    stationCode: attrs.Code,
    platforms: _.map(station.P, platform => {
      return mapPlatform(platform, attrs.Code);
    })
  };
}
