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

var GeoTransformer = function(radarConfig){
    if(!radarConfig){
        console.log('Radar object cant be created without radarConfig parametars.');
    }
    var obj = Object.create(GeoTransformer.prototype);

    // Input target values declaration
    obj.azimuth = '';
    obj.range = '';
    obj.altitude = '';

    //Output target values declaration
    obj.calculatedLatitude = '';
    obj.calculatedLongitude = '';

    // Site values
    var radar = require('./radar')(radarConfig);   //CroRadar croRadar=CroRadarProvider.getCroRadar(rdAdv.getRadarDetectionPK().getRadarId());
    obj.siteLatitude = radar.getLatitudeRadians();
    obj.siteLongitude = radar.getLongitudeRadians();
    obj.siteHeight = radar.getHeightInMeters();
    obj.siteEarthRadius = radar.getSiteEarthRadius();
    obj.ni = '';
    obj.eta = '';
    var cosSiteLat = radar.getCosSiteLat();
    var sinSiteLat = radar.getSinSiteLat();
    var cosSiteLon = radar.getCosSiteLon();
    var sinSiteLon = radar.getSinSiteLon();

    obj.toCartesieCoordinatesTarget = function(){
        var cartesieCoordinatesTarget = [3];
        cartesieCoordinatesTarget[0] = (-sinSiteLon * obj.toLocalCartesianCoordinates()[0] + (-sinSiteLat * cosSiteLon * obj.toLocalCartesianCoordinates()[1] + cosSiteLat * cosSiteLon * obj.toLocalCartesianCoordinates()[2] + obj.toCartesieCoordinatesSite()[0]));
        cartesieCoordinatesTarget[1] = (cosSiteLon * obj.toLocalCartesianCoordinates()[0] + (-sinSiteLat * sinSiteLon * obj.toLocalCartesianCoordinates()[1] + cosSiteLat * sinSiteLon * obj.toLocalCartesianCoordinates()[2] + obj.toCartesieCoordinatesSite()[1]));
        cartesieCoordinatesTarget[2] = (cosSiteLat * obj.toLocalCartesianCoordinates()[1] + sinSiteLat * obj.toLocalCartesianCoordinates()[2] + obj.toCartesieCoordinatesSite()[2]);
        return cartesieCoordinatesTarget;
    };

    obj.toCartesieCoordinatesSite = function(){
        var cartezieCoordinatesRadar = [3];
        cartezieCoordinatesRadar[0] = ((obj.ni + obj.siteHeight) * cosSiteLat * cosSiteLon);
        cartezieCoordinatesRadar[1] = ((obj.ni + obj.siteHeight) * obj.cosSiteLat * sinSiteLon);
        cartezieCoordinatesRadar[2] = ((obj.ni * 0.99330562000987 + obj.siteHeight) * sinSiteLat);
        return cartezieCoordinatesRadar;
    };

    obj.toLocalCartesianCoordinates = function(){
        var localCartesianCoordinates = [3];
        localCartesianCoordinates[0] = (obj.range * Math.cos(obj.eta) * Math.sin(obj.azimuth));
        localCartesianCoordinates[1] = (obj.range * Math.cos(obj.eta) * Math.cos(obj.azimuth));
        localCartesianCoordinates[2] = (obj.range * Math.sin(obj.eta));
        return localCartesianCoordinates;
    };
    return obj;
};

GeoTransformer.prototype.convertTarget = function(target){

    // Azimuth expected in degrees, should be converted in radians
    this.azimuth = Math.radians(target.azimuth); // radarDetection.getAzimuthRadians();
    // Range expected in NM, should be converted in meters
    this.range = 1852 * target.range; // radarDetection.getRangeMeters();//1852.0D * rdAdv.getRangeNM();
    // Height expected in feeets should be converted in meters
    this.altitude = target.altitude * 0.3048;
    this.ni = 6378137.0 / Math.sqrt(1 - 0.00669437999013 * Math.pow(Math.sin(this.altitude), 2));
    this.eta = Math.asin((2 * this.siteEarthRadius * (this.altitude - this.siteHeight) + Math.pow(this.altitude, 2) - Math.pow(this.siteHeight, 2) - Math.pow(this.range, 2)) / (2 * this.range * (this.siteEarthRadius + this.siteHeight)));;

    var calculatedLatitude = Math.atan((1 + this.altitude / this.ni) / (1 - (0.00669437999013 + this.altitude / this.ni)) * this.toCartesieCoordinatesTarget()[2] / Math.sqrt(Math.pow(this.toCartesieCoordinatesTarget()[0], 2) + Math.pow(this.toCartesieCoordinatesTarget()[1], 2)));
    var calculatedLongitude = Math.atan(this.toCartesieCoordinatesTarget()[1] / this.toCartesieCoordinatesTarget()[0]);

    return {
        latitude : calculatedLatitude,
        longitude : calculatedLongitude,
        altitude: this.altitude
    };
};

/*GeoTransformer.prototype.setLatLon = function(){
    this.calculatedLatitude = Math.atan((1 + this.altitude / this.ni) / (1 - (0.00669437999013 + this.altitude / this.ni)) * toCartesieCoordinatesTarget()[2] / Math.sqrt(Math.pow(toCartesieCoordinatesTarget()[0], 2) + Math.pow(toCartesieCoordinatesTarget()[1], 2)));
    this.calculatedLongitude = Math.atan(toCartesieCoordinatesTarget()[1] / toCartesieCoordinatesTarget()[0]);
};*/


/*GeoTransformer.prototype.radiusOfEarth = function(latitude){
    return 6335439.3272928922 / Math.sqrt(Math.pow(1 - 0.00669437999013 * Math.pow(Math.sin(latitude), 2), 3));
};

GeoTransformer.prototype.eta = function(){
    return Math.asin((2 * this.siteEarthRadius * (this.altitude - this.siteHeight) + Math.pow(this.altitude, 2) - Math.pow(this.siteHeight, 2) - Math.pow(this.range, 2)) / (2 * this.range * (this.siteEarthRadius + this.siteHeight)));
};

GeoTransformer.prototype.ni = function(targetAlatitude){
    return 6378137.0 / Math.sqrt(1 - 0.00669437999013 * Math.pow(Math.sin(targetAlatitude), 2));
};*/

var WGS84 = {
    a : 6378137.0,
    b : 6356752.3140000002,
    e : 0.0818191908426,
    esq : 0.00669437999013
};
