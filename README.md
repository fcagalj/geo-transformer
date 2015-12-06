# Azimuth/Range/Height to Lat/Lon

This module synchrony converts polar coordinates for local coordinate system of known geo position (radar) to
Geographic coordinate system. Polar coordinates are given as slant range (line of sight distance) from radar to point,
azimuthal bearing of the point and actual elevation above mean sea level (AML). Geographic coordinate system point is
represented with geodetic latitude and longitude, and altitude relative to WGS 84 ellipsoid (AML).

## Math and precision

All constants regarding WGS84 ellipsoid standards follow EUROCONTROL's "ASTERIX Category 17 Coordinate Transformations"
specification.

## Installation

NodeJS:

`npm install geo-transformer`

Bower

`bower install geo-transformer`

## API

### NodeJS - simple target

```javascript

var gt = require('geo-transformer');

var exampleRadar = {
    radarId: 15, //Optional
    radarName: 'Example radar',  //Optional
    radarLatitude: '44.16',
    radarLongitude: '16.60',
    radarHeight: '6062'   //feet
};

var target = {
    azimuth: '111.95',
    range: '72.164',
    altitude: '4200'
};

var exampleRadarGt = gt(exampleRadar);

exampleTargets.forEach(function (target) {
    var resultTarget = exampleRadarGt.convertTarget(target);
    console.log('\nLatitude: ' + resultTarget.latitude + '\nLongitude: ' + resultTarget.longitude + '\nAltitude: ' + resultTarget.altitude);
});

```
