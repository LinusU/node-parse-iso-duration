/* eslint-env mocha */

var assert = require('assert')
var parseIsoDuration = require('../')

describe('parseIsoDuration', function () {
  it('should parse durations', function () {
    assert.equal(parseIsoDuration('P0W'), 0)
    assert.equal(parseIsoDuration('P1W'), 1 * 604800000)
    assert.equal(parseIsoDuration('P5W'), 5 * 604800000)
    assert.equal(parseIsoDuration('P10W'), 10 * 604800000)

    assert.equal(parseIsoDuration('PT0S'), 0)
    assert.equal(parseIsoDuration('PT1S'), 1 * 1000)
    assert.equal(parseIsoDuration('PT5S'), 5 * 1000)
    assert.equal(parseIsoDuration('PT10S'), 10 * 1000)

    assert.equal(parseIsoDuration('PT0M'), 0)
    assert.equal(parseIsoDuration('PT1M'), 1 * 60000)
    assert.equal(parseIsoDuration('PT5M'), 5 * 60000)
    assert.equal(parseIsoDuration('PT10M'), 10 * 60000)

    assert.equal(parseIsoDuration('PT0H'), 0)
    assert.equal(parseIsoDuration('PT1H'), 1 * 3600000)
    assert.equal(parseIsoDuration('PT5H'), 5 * 3600000)
    assert.equal(parseIsoDuration('PT10H'), 10 * 3600000)

    assert.equal(parseIsoDuration('PT0H2M'), 2 * 60000)
    assert.equal(parseIsoDuration('PT1H5M'), 1 * 3600000 + 5 * 60000)
    assert.equal(parseIsoDuration('PT5H10S'), 5 * 3600000 + 10 * 1000)
    assert.equal(parseIsoDuration('PT10H40M23S'), 10 * 3600000 + 40 * 60000 + 23 * 1000)

    assert.equal(parseIsoDuration('P0D'), 0 * 86400000)
    assert.equal(parseIsoDuration('P1D'), 1 * 86400000)
    assert.equal(parseIsoDuration('P5D'), 5 * 86400000)
    assert.equal(parseIsoDuration('P10D'), 10 * 86400000)

    assert.equal(parseIsoDuration('P0DT30M'), 0 * 86400000 + 30 * 60000)
    assert.equal(parseIsoDuration('P10DT30S'), 10 * 86400000 + 30 * 1000)
    assert.equal(parseIsoDuration('P12DT28M'), 12 * 86400000 + 28 * 60000)
    assert.equal(parseIsoDuration('P14DT26H'), 14 * 86400000 + 26 * 3600000)
  })

  it('should throw on garbage', function () {
    var invalid = [
      'Jsjd kals',
      'PTJKS',
      'PT123123',
      ' gdjfkds',
      'Hello world'
    ]

    invalid.forEach(function (str) {
      assert.throws(parseIsoDuration.bind(null, str), Error, 'Invalid duration')
    })
  })

  it('should throw on ambiguous durations', function () {
    var ambiguous = [
      'P10Y',
      'P5MT10M',
      'P0Y1M',
      'P1Y0MT24H',
      'P8Y20M10D'
    ]

    ambiguous.forEach(function (str) {
      assert.throws(parseIsoDuration.bind(null, str), Error, 'Ambiguous duration')
    })
  })
})
