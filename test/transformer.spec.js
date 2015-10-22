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
var targetMoch1 = {
    latitude: 44.85596817,
    longitude: 20.32203373
};
var transformerObj = require('../lib/transformer'); //(radarTestConf3);

var transformer = transformerObj(radarTestConf3);

describe('GeoTransformer module', function () {
    it('should have method convertTarget', function () {
        transformer.should.have.property('convertTarget');
    });
    it('geoTransformer should transform test target, and result error mus be smaller than 0.03', function () {
        var result = transformer.convertTarget(target1);

        //result error exist because of different floating number processing on different platforms
        result.latitude.should.be.approximately(targetMoch1.latitude, 0.03);
        result.longitude.should.be.approximately(targetMoch1.longitude, 0.03);
    });
});