'use strict';

var should = require('should');

var radarTestConf3 = {
    radarId: 3,
    radarName: 'Test3',
    radarLatitude: '45.32',
    radarLongitude: '18.75',
    radarHeight: '388'
};
var target1 = {
    azimuth: '111.95',
    range: '72.164',
    altitude: '4200'
};
var target1Moch = {
    latitude: 44.85596817,
    longitude: 20.32203373,
    altitude: '4200'
};
var target2 = {
    azimuth: '118.65',
    range: '83.981',
    altitude: '5000'
};
var target2Moch = {
    latitude: 44.63228177,
    longitude: 20.47387261,
    altitude: 5000
};

var target3 = {
    azimuth: '126.98',
    range: '94.923',
    altitude: '5800'
};
var target3Moch = {
    latitude: 44.35109775,
    longitude: 20.51503774,
    altitude: 5800
};


var transformerObj = require('../lib/transformer'); //(radarTestConf3);

var transformer = transformerObj(radarTestConf3);

describe('GeoTransformer module', function () {
    it('should have method convertTarget', function () {
        transformer.should.have.property('convertTarget');
    });
    it('should transform test target1, and result error mus be smaller than 0.03', function () {
        var result1 = transformer.convertTarget(target1);

        //result error exist because of different floating number processing on different platforms
        result1.latitude.should.be.approximately(target1Moch.latitude, 0.03);
        result1.longitude.should.be.approximately(target1Moch.longitude, 0.03);
        result1.altitude.should.be.equal(parseInt(target1Moch.altitude, 10));
    });
    it('should transform test target2, and result error mus be smaller than 0.03', function () {
        var result2 = transformer.convertTarget(target2);

        //result error exist because of different floating number processing on different platforms
        result2.latitude.should.be.approximately(target2Moch.latitude, 0.03);
        result2.longitude.should.be.approximately(target2Moch.longitude, 0.03);
        result2.altitude.should.be.equal(parseInt(target2Moch.altitude, 10));
    });
    it('should transform test target3, and result error mus be smaller than 0.03', function () {
        var result3 = transformer.convertTarget(target3);

        //result error exist because of different floating number processing on different platforms
        result3.latitude.should.be.approximately(target3Moch.latitude, 0.03);
        result3.longitude.should.be.approximately(target3Moch.longitude, 0.03);
        result3.altitude.should.be.equal(parseInt(target3Moch.altitude, 10));
    });
});