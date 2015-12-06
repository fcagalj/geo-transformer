'use strict';

var gt = require('./lib/transformer');

var unknownRadar = {
    radarId: 15, //Optional
    radarName: 'Unknown radar',  //Optional
    radarLatitude: '44.16',
    radarLongitude: '16.60',
    radarHeight: '6062'   //feet
};
var unknownRadarTrans = gt(unknownRadar);

var resultTarget = unknownRadarTrans.convertTarget({
    //azimuth: '118.65',
    //range: '83.981',
    //altitude: '5000'
    azimuth: '242.71', // azimuth.toString(),
    range: '52.771', //range.toString(),
    altitude: '111'
});
console.log('Latitude: %s\nLongitude: %s', resultTarget.latitude, resultTarget.longitude);

module.exports = gt;