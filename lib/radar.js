'use strict';

/**
 * Radar object should be initialized with radarConfig data:
 radarConfig{
      radarId: 1,           //optional
      radarName:            //optional
      latitude: '42.32',    //degrees
      longitude: '11.22',   //degrees
      radarHeight: '3500'   //feets
   };
 * radarConfig object expect latitude&longitude in degrees and height in feets.
 * @param radarConfig
 * @returns {Radar}
 * @constructor
 */

var Radar = function (radarConfig) {
    if (!radarConfig) {
        console.log('Radar object cant be created without radarConfig parametars.');
    }
    var obj = {};

    obj.radarId = radarConfig.radarId;
    obj.radarName = radarConfig.radarName;
    var radarLatitude = parseFloat(radarConfig.radarLatitude);   //degrees
    var radarLongitude = parseFloat(radarConfig.radarLongitude); //degrees
    var radarHeight = parseFloat(radarConfig.radarHeight);       //feets

    var latitudeRadians = Math.radians(radarLatitude); //Double.valueOf(ProjMath.degToRad(this.getLatitude().doubleValue()));
    var longitudeRadians = Math.radians(radarLongitude); //Double.valueOf(ProjMath.degToRad(this.getLongitude().doubleValue()));
    //console.log('orga lat: ' + radarConfig.radarLatitude + 'rad lat deg: ' + radarLatitude + ' radians: ' + latitudeRadians)

    var radarHeightMeters = radarHeight * 0.3048; //Double.valueOf(0.3048D * this.getHeight().doubleValue());

    /* Latituda */
    var cosSiteLat = Math.cos(latitudeRadians);
    var sinSiteLat = Math.sin(latitudeRadians);
    /* Longituda */
    var cosSiteLon = Math.cos(longitudeRadians);
    var sinSiteLon = Math.sin(longitudeRadians);

    var siteEarthRadius = 6335439.3272928922 / Math.sqrt(Math.pow(1 - 0.00669437999013 * Math.pow(Math.sin(latitudeRadians), 2), 3));

    obj.getCosSiteLat = function () {
        return cosSiteLat;
    };

    obj.getSinSiteLat = function () {
        return sinSiteLat;
    };

    obj.getCosSiteLon = function () {
        return cosSiteLon;
    };

    obj.getSinSiteLon = function () {
        return sinSiteLon;
    };

    obj.getSiteEarthRadius = function () {
        return siteEarthRadius;
    };
    obj.getHeightInMeters = function () {
        return radarHeightMeters;
    };

    obj.getLatitudeRadians = function () {
        return latitudeRadians;
    };

    obj.getLongitudeRadians = function () {
        return longitudeRadians;
    };
    return obj;
};
// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};

module.exports = Radar;
