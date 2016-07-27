import _ from 'lodash';

/**
* [mapTrain description]
* @param  {Object}
*/
export default function mapTrain(train) {
  if (!_.isObject(train) || _.isEmpty(train)) {
    return null;
  }

  const attrs = train.$ || train;

  if (!_.isObject(attrs) || !_.isString(attrs.S)) {
    return null;
  }

  return {
    setNumber: attrs.S,
    tripNumber: attrs.T,
    timeTo: attrs.C,
    location: attrs.L,
    dest: attrs.DE,
    destCode: attrs.D,
    trainCode: attrs.S
  };
}
