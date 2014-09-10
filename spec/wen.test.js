var should = require('should');
var wen = require('..');

describe('wen', function () {
	var truthy, start, end;

	beforeEach(function () {
		truthy = wen();
		start = new Date();
	});

	describe('#add', function () {
		it('should return true within a few hundred milliseconds', function (done) {
			this.timeout(3000);
			var willBeTrue = false;

			truthy.on('is-now-true', function () {
				end = new Date();
				(end - start).should.not.be.below(500).and.not.above(1600);
				willBeTrue.should.eql(true);
				done();
			});

			truthy.add(function () {
				return willBeTrue;
			}, 'is-now-true');

			setTimeout(function () {
				willBeTrue = true;
			}, 1500);
		});

		it('should return truthy within a few milliseconds', function (done) {
			var willBeTrue;

			truthy.on('is-now-true', function () {
				end = new Date();
				(end - start).should.not.be.below(10).and.not.above(1000);
				willBeTrue.should.be.ok;
				done();
			});

			truthy.add(function () {
				return willBeTrue;
			}, 'is-now-true');

			setTimeout(function () {
				willBeTrue = 'HELLO I AM TRUTHY LOLOLOL';
			}, 10);
		});

		it('should return true within a few milliseconds if the delay is smaller', function (done) {
			var willBe10 = 0;

			truthy.on('is-now-higher', function () {
				end = new Date();
				(end - start).should.not.be.below(100).and.not.above(130);
				willBe10.should.not.be.below(10);
				done();
			});

			truthy.add(function () {
				return (willBe10++) > 10;
			}, 'is-now-higher', 10);
		});

		it('should execute immediately if already true', function (done) {
			truthy.on('is-now-higher', function () {
				end = new Date();
				(end - start).should.not.be.above(5);
				done();
			});

			truthy.add(function () {
				return true;
			}, 'is-now-higher', 10);
		});

		it('should throw an error if you do not supply an event', function () {
			should(function () {
				truthy.add(function () {});
			}).throw();
		});
	});
});