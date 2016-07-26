import _ from 'lodash';

import mapTrain from './mapTrain';

/**
* [mapPlatform description]
* @param  {Object}
*/
export default function mapPlatform(platform, stationCode = null) {
  if (!_.isObject(platform) || _.isEmpty(platform)) {
    return {};
  }

  return {
    name: platform.$.N,
    platformCode: platform.$.Code,
    station: stationCode,
    trains: _.map(platform.T, mapTrain)
  };
}
