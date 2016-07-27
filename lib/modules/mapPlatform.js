import _ from 'lodash';

import main from './main';

/**
* [mapPlatform description]
* @param  {Object}
*/
export default function mapPlatform(platform) {
  if (!_.isObject(platform) || _.isEmpty(platform)) {
    return null;
  }

  const attrs = platform.$ || platform;

  if (!_.isObject(attrs) || !_.isString(attrs.Code)) {
    return null;
  }

  const trains = [];

  if (_.isArray(platform.T) && !_.isEmpty(platform.T)) {
    _.each(platform.T, trainFeed => {
      const train = main.mapTrain(trainFeed);
      if (_.isObject(train)) {
        trains.push(train);
      }
    });
  }

  return {
    name: attrs.N,
    platformCode: attrs.Code,
    trains: trains
  };
}
