# TFL Prediction Summary [![Build Status](https://travis-ci.org/paolo-chiabrera/tfl-prediction-summary.svg?branch=master)](https://travis-ci.org/paolo-chiabrera/tfl-prediction-summary) [![Coverage Status](https://coveralls.io/repos/github/paolo-chiabrera/tfl-prediction-summary/badge.svg?branch=master)](https://coveralls.io/github/paolo-chiabrera/tfl-prediction-summary?branch=master)

[![NPM](https://nodei.co/npm/tfl-prediction-summary.png)](https://nodei.co/npm/tfl-prediction-summary/)

`tfl-prediction-summary` provides a simple module to consume the TFL (Transport for London) Prediction Summary feed (XML) and convert/parse it in an easier form to handle with JS.

Maintained by [Paolo Chiabrera](https://github.com/paolo-chiabrera).

## Install

```
$ npm i tfl-prediction-summary
```

## Usage

### ES6
```
import TflPredictionSummary from 'tfl-prediction-summary';

const tflPredictionSummary = new TflPredictionSummary();
```

### ES5
```
var TflPredictionSummary = require('tfl-prediction-summary');

var tflPredictionSummary = new TflPredictionSummary();
```

## API

### tflPredictionSummary.getPredictionSummary(lineCode)

`lineCode` (optional) accepted values are: ['B', 'C', 'CI', 'D', 'H', 'J', 'M', 'N', 'P', 'V', 'W']

```
const promise = tflPredictionSummary.getPredictionSummary(lineCode);

promise.then(function (response) {
    /* here you get the prediction summary */
}, function (err) {
    /* too bad, something wrong happened */
});
```

if a valid lineCode is passed, the promise will return the relative line prediction summary object

```
tflPredictionSummary.getPredictionSummary('B');

/* response sample */

{
    "lineCode": "V",
    "datetime": "2016-07-27T21:08:38.000Z",
    "stations": [{
        "name": "Blackhorse Road",
        "stationCode": "BHR",
        "platforms": [{
            "name": "Northbound - Platform 1",
            "platformCode": "0",
            "trains": [{
                "setNumber": "231",
                "tripNumber": "30",
                "timeTo": "2:00",
                "location": "At Tottenham Hale",
                "dest": "Walthamstow Central",
                "destCode": "457",
                "trainCode": "231"
            }]
        }, {
            "name": "Southbound - Platform 2",
            "platformCode": "1",
            "trains": []
        }]
    }]
}
```

if no lineCode is provided, all lines summaries will be retrieved and returned as an ordered array

```
tflPredictionSummary.getPredictionSummary();

/* response sample */

[{
    "lineCode": "B",
    "datetime": "2016-07-27T21:05:36.000Z",
    "stations": [{
        "name": "Baker Street",
        "stationCode": "BST",
        "platforms": [{
            "name": "Southbound - Platform 8",
            "platformCode": "1",
            "trains": [{
                "setNumber": "233",
                "tripNumber": "28",
                "timeTo": "3:00",
                "location": "At Edgware Road Platform 2",
                "dest": "Elephant and Castle",
                "destCode": "154",
                "trainCode": "233"
            }]
        }, {
            "name": "Northbound - Platform 9",
            "platformCode": "0",
            "trains": [{
                "setNumber": "231",
                "tripNumber": "25",
                "timeTo": "1:00",
                "location": "Between Regents Park and Baker Street",
                "dest": "Stonebridge Park",
                "destCode": "345",
                "trainCode": "231"
            }]
        }]
    }]
}, {
    "lineCode": "V",
    "datetime": "2016-07-27T21:08:38.000Z",
    "stations": [{
        "name": "Blackhorse Road",
        "stationCode": "BHR",
        "platforms": [{
            "name": "Northbound - Platform 1",
            "platformCode": "0",
            "trains": [{
                "setNumber": "231",
                "tripNumber": "30",
                "timeTo": "2:00",
                "location": "At Tottenham Hale",
                "dest": "Walthamstow Central",
                "destCode": "457",
                "trainCode": "231"
            }]
        }, {
            "name": "Southbound - Platform 2",
            "platformCode": "1",
            "trains": []
        }]
    }]
}]
```

## Notes

The core method for getting the prediction summary feed is memoized in order to improve the performances,
the data is automatically refreshed ever 30 seconds.

## License

MIT
