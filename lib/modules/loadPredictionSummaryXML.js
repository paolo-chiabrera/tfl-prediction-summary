import _ from 'lodash';
import needle from 'needle';

/**
 * [loadLineStatusXML description]
 * @param  {Function}
 */
export default function loadPredictionSummaryXML(lineCode, callback) {
  if (!_.isFunction(callback)) {
    return;
  }

  if (!_.isString(lineCode) || lineCode.length <= 0) {
    callback('lineCode is not a valid String');
    return;
  }

  const feedUrl = 'http://cloud.tfl.gov.uk/TrackerNet/PredictionSummary/' + lineCode.substr(0, 1);

  const options = {
    headers: {
      'Content-Type': 'text/xml'
    }
  };

  needle.get(feedUrl, options, (err, res) => {
    if (err) {
      callback(err);
      return;
    }

    if (res.statusCode !== 200) {
      callback('wrong statusCode ' + res.statusCode);
      return;
    }

    callback(null, res.body);
  });
}
