/**
 * Created by frane on 21.10.2015..
 */

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
var Radar = function(radarConfig){
    if(!radarConfig){
        console.log('Radar object cant be created without radarConfig parametars.');
    }
    var obj = {};

    obj.radarId = radarConfig.radarId;
    obj.radarName = radarConfig.radarName;
    var radarLatitude = radarConfig.radarLatitude;   //degrees
    var radarLongitude = radarConfig.radarLongitude; //degrees
    var radarHeight = radarConfig.radarHeight;       //feets

    var latitudeRadians = Math.radians(radarLatitude); //Double.valueOf(ProjMath.degToRad(this.getLatitude().doubleValue()));
    var longitudeRadians = Math.radians(radarLongitude); //Double.valueOf(ProjMath.degToRad(this.getLongitude().doubleValue()));
    var radarHeightMeters = radarHeight * 0.3048; //Double.valueOf(0.3048D * this.getHeight().doubleValue());

    /* Latituda */
    var cosSiteLat = Math.cos(latitudeRadians);
    var sinSiteLat = Math.sin(latitudeRadians);
    /* Longituda */
    var cosSiteLon = Math.cos(longitudeRadians);
    var sinSiteLon = Math.sin(longitudeRadians);

    var siteEarthRadius= 6335439.3272928922 / Math.sqrt(Math.pow(1 - 0.00669437999013 * Math.pow(Math.sin(latitude), 2), 3));

    function getCosSiteLat() {
        return cosSiteLat;
    }

    function getSinSiteLat() {
        return sinSiteLat;
    }

    function getCosSiteLon() {
        return cosSiteLon;
    }

    function getSinSiteLon() {
        return sinSiteLon;
    }

    function getSiteEarthRadius() {
        return siteEarthRadius;
    }
    function getHeightInMeters() {
        return radarHeightMeters;
    }

    function getLatitudeRadians() {
        return latitudeRadians;
    }

    function getLongitudeRadians() {
        return longitudeRadians;
    }

    function getRadarHeightMeters() {
        return radarHeightMeters;
    }
    return obj;
};
// Converts from degrees to radians.
Math.prototype.radians = function(degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.prototype.degrees = function(radians) {
    return radians * 180 / Math.PI;
};

module.exports = Radar;
