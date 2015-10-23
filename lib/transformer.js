'use strict';

/**
 * GeoTransformer should be initialized with radarConfig object (Consult Radar object for details)
 *
 * Conversion of target should be called in convertTarget method providing target object:
 target =  {
      azimuth: 65,    //degrees 0-360
      range: 200,     //nautical miles NM
      altitude: 2000  //feets
   }
 * @param radarConfig
 * @returns {point}
 */

var geoTransformer = function (radarConfig) {
    if (!radarConfig) {
        console.log('Radar object cant be created without radarConfig parametars.');
    }
    var obj = {}; //Object.create(GeoTransformer.prototype);

    // Input target values declaration
    var azimuth, range, altitude;

    // Site values
    var radar = require('./radar')(radarConfig);   //CroRadar croRadar=CroRadarProvider.getCroRadar(rdAdv.getRadarDetectionPK().getRadarId());

    //var siteLatitude = radar.getLatitudeRadians();
    //var siteLongitude = radar.getLongitudeRadians();
    var siteHeight = radar.getHeightInMeters();
    var siteEarthRadius = radar.getSiteEarthRadius();
    var ni, eta;
    var cosSiteLat = radar.getCosSiteLat();
    var sinSiteLat = radar.getSinSiteLat();
    var cosSiteLon = radar.getCosSiteLon();
    var sinSiteLon = radar.getSinSiteLon();

    var toCartesieCoordinatesTarget = function () {
        var cartesieCoordinatesTarget = [3];
        var localCartesianCoordinates = toLocalCartesianCoordinates();
        var cartesieCoordinatesSite = toCartesieCoordinatesSite();
        cartesieCoordinatesTarget[0] = (-sinSiteLon * localCartesianCoordinates[0] + (-sinSiteLat * cosSiteLon * localCartesianCoordinates[1] + cosSiteLat * cosSiteLon * localCartesianCoordinates[2] + cartesieCoordinatesSite[0]));
        cartesieCoordinatesTarget[1] = (cosSiteLon * localCartesianCoordinates[0] + (-sinSiteLat * sinSiteLon * localCartesianCoordinates[1] + cosSiteLat * sinSiteLon * localCartesianCoordinates[2] + cartesieCoordinatesSite[1]));
        cartesieCoordinatesTarget[2] = (cosSiteLat * localCartesianCoordinates[1] + sinSiteLat * localCartesianCoordinates[2] + cartesieCoordinatesSite[2]);
        return cartesieCoordinatesTarget;
    };

    var toCartesieCoordinatesSite = function () {
        var cartezieCoordinatesRadar = [3];
        cartezieCoordinatesRadar[0] = ((ni + siteHeight) * cosSiteLat * cosSiteLon);
        cartezieCoordinatesRadar[1] = ((ni + siteHeight) * cosSiteLat * sinSiteLon);
        cartezieCoordinatesRadar[2] = ((ni * 0.99330562000987 + siteHeight) * sinSiteLat);
        return cartezieCoordinatesRadar;
    };

    var toLocalCartesianCoordinates = function () {
        var localCartesianCoordinates = [3];
        localCartesianCoordinates[0] = (range * Math.cos(eta) * Math.sin(azimuth));
        localCartesianCoordinates[1] = (range * Math.cos(eta) * Math.cos(azimuth));
        localCartesianCoordinates[2] = (range * Math.sin(eta));
        return localCartesianCoordinates;
    };

    obj.convertTarget = function (target) {
        if (!target) {
            console.log('Unable to convert coordinates without input parametars.');
        }
        // Azimuth expected in degrees, should be converted in radians
        azimuth = Math.radians(parseFloat(target.azimuth)); // radarDetection.getAzimuthRadians();
        // Range expected in NM, should be converted in meters
        range = 1852 * parseFloat(target.range); // radarDetection.getRangeMeters();//1852.0D * rdAdv.getRangeNM();
        // Height expected in feeets should be converted in meters
     //   altitude = parseFloat(target.altitude) * 0.3048;
        var altitudeFeet = parseFloat(target.altitude);
        altitude = altitudeFeet * 0.3048;
        ni = 6378137.0 / Math.sqrt(1 - 0.00669437999013 * Math.pow(Math.sin(altitude), 2));
        eta = Math.asin((2 * siteEarthRadius * (altitude - siteHeight) + Math.pow(altitude, 2) - Math.pow(siteHeight, 2) - Math.pow(range, 2)) / (2 * range * (siteEarthRadius + siteHeight)));

        var cartesieCoordinatesTarget = toCartesieCoordinatesTarget();

        var calculatedLatitude = Math.atan((1 + altitude / ni) / (1 - (0.00669437999013 + altitude / ni)) * cartesieCoordinatesTarget[2] / Math.sqrt(Math.pow(cartesieCoordinatesTarget[0], 2) + Math.pow(cartesieCoordinatesTarget[1], 2)));
        var calculatedLongitude = Math.atan(cartesieCoordinatesTarget[1] / cartesieCoordinatesTarget[0]);

        var latitude = Math.degrees(calculatedLatitude);
        var longitude = Math.degrees(calculatedLongitude);


        return {
            latitude: latitude,
            longitude: longitude,
            altitude: altitudeFeet
        };
    };

    return obj;
};

// Converts from degrees to radians.
Math.radians = function(degrees) {
    return degrees * Math.PI / 180;
};
// Converts from radians to degrees.
Math.degrees = function(radians) {
    return radians * 180 / Math.PI;
};
module.exports = geoTransformer;
