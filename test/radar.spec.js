'use strict';

var should = require('should');

//var radar1Moch = require('../lib/radars.config')[0];
//var radar1 = require('../lib/radar')(radar1Moch);

var radar5Moch = {
    radarId: 5,
    radarName: 'Test5',
    radarLatitude: '44.39',
    radarLongitude: '18.20',
    radarHeight: '2300'
};
var radar5 = require('../lib/radar')(radar5Moch);

describe('Radar object', function () {
    it('radar config object should have prerequested properties', function () {
        radar5Moch.should.have.property('radarId', 5);
        radar5Moch.should.have.property('radarName', 'Test5');
        radar5Moch.should.have.property('radarLatitude', '44.39');
        radar5Moch.should.have.property('radarLongitude', '18.20');
        radar5Moch.should.have.property('radarHeight', '2300');
    });
    it('radar object should be able to calc all values', function () {
        radar5.should.have.property('radarId', 5);
        radar5.should.have.property('radarName', 'Test5');

        radar5.should.have.property('getCosSiteLat');
        radar5.should.have.property('getSinSiteLat');
        radar5.should.have.property('getCosSiteLon');
        radar5.should.have.property('getSinSiteLon');
        radar5.should.have.property('getSiteEarthRadius');
        radar5.should.have.property('getHeightInMeters');
        radar5.should.have.property('getLatitudeRadians');
        radar5.should.have.property('getLongitudeRadians');

        radar5.getCosSiteLat().should.be.a.Number().and.should.be.ok();
        radar5.getSinSiteLat().should.be.a.Number().and.should.be.ok();
        radar5.getCosSiteLon().should.be.a.Number().and.should.be.ok();
        radar5.getSinSiteLon().should.be.a.Number().and.should.be.ok();
        radar5.getSiteEarthRadius().should.be.a.Number().and.should.be.ok();
        radar5.getHeightInMeters().should.be.a.Number().and.should.be.ok();
        radar5.getLatitudeRadians().should.be.a.Number().and.should.be.ok();
        radar5.getLongitudeRadians().should.be.a.Number().and.should.be.ok();
    });
});