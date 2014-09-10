var extend = require('js-extend').extend;
var EventEmitter = require('wolfy87-eventemitter');

function TruthinessMonitor () {
	this.intervals = {};
}

TruthinessMonitor.prototype.add = function (predicate, event, delay) {
	if (this.intervals[event]) {
		throw new Error('You have already registered to watch for a truth with that event');
	}

	if (predicate()) {
		this.trigger(event);
		return;
	}

	this.intervals[event] = setInterval(function () {
		if (predicate()) {
			this.trigger(event);
			clearTimeout(this.intervals[event]);
			delete this.intervals[event];
		}
	}.bind(this), delay);
};

extend(TruthinessMonitor.prototype, EventEmitter.prototype);

function create() {
	return new TruthinessMonitor();
}

module.exports = create;