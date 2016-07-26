# TFL Prediction Summary [![Build Status](https://travis-ci.org/paolo-chiabrera/tfl-prediction-summary.svg?branch=master)](https://travis-ci.org/paolo-chiabrera/tfl-prediction-summary) [![Build Status](https://travis-ci.org/paolo-chiabrera/tfl-prediction-summary.svg?branch=master)](https://travis-ci.org/paolo-chiabrera/tfl-prediction-summary)

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

### tflPredictionSummary.getPredictionSummary(lineName)

`lineName` must be a String and is mandatory, accepted values are: ['B', 'C', 'CI', 'D', 'H', 'J', 'M', 'N', 'P', 'V', 'W']

```
const promise = tflPredictionSummary.getPredictionSummary('B');

promise.then(function (response) {
    /* here you get the prediction summary */
}, function (err) {
    /* too bad, something wrong happened */
});
```

## Notes

The core method for getting the prediction summary feed is memoized in order to improve the performances,
the data is automatically refreshed ever 30 seconds.

## License

MIT
