# Azimuth/Range/Height to Lat/Lon

This module synchrony converts polar coordinates for local coordinate system of known geo position (radar) to
Geographic coordinate system. Polar coordinates are given as slant range (line of sight distance) from radar to point,
azimuthal bearing of the point and actual elevation above mean sea level. In Geographic coordinate system point is
represented as geodetic latitude and longitude, and altitude relative to WGS 84 elipsoid.

The output can be GeoJSON, KML, or simple lat/lon/altitude CSV.

## Math and precision

All constants are founded in EUROCONTROL's "ASTERIX Category 17 Coordinate Transformations" specification.

## Installation

NodeJS:

`npm install -g geo-transformer`

Bower

`bower install geo-transformer`

## API

###NodeJS - one point

```javascript

var gt = require('geo-transformer'),
    fs = require('fs'),
    // node doesn't have xml parsing or a dom. use jsdom
    //jsdom = require('jsdom').jsdom;

var kml = jsdom(fs.readFileSync('foo.kml', 'utf8'));

var converted = tj.kml(kml);

var converted_with_styles = tj.kml(kml, { styles: true });
```
