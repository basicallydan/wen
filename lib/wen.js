(function() {
	var extend = require('js-extend').extend;
	var EventEmitter = require('wolfy87-eventemitter');
	var root = global || window;

	function TruthinessMonitor() {
		this.intervals = {};
	}

	TruthinessMonitor.prototype.add = function(predicate, event, delay, expiresAfter) {
		if (!event) {
			throw new Error('You must supply an event with your predicate');
		}
		var truthyCount = 0;

		expiresAfter = (typeof expiresAfter !== 'undefined') ? expiresAfter : 1;

		delay = (typeof delay !== 'undefined') ? delay : 100;

		if (this.intervals[event]) {
			throw new Error('You have already registered to watch for a truth with that event');
		}

		if (predicate()) {
			this.trigger(event);
			truthyCount += 1;
			if (expiresAfter === 1) {
				return;
			}
		}

		this.intervals[event] = setInterval(function() {
			if (predicate()) {
				this.trigger(event);
				truthyCount += 1;
				if (expiresAfter !== 0 && truthyCount >= expiresAfter) {
					clearInterval(this.intervals[event]);
					delete this.intervals[event];
				}
			}
		}.bind(this), delay);
	};

	extend(TruthinessMonitor.prototype, EventEmitter.prototype);

	function create() {
		return new TruthinessMonitor();
	}

	module.exports = create;

	// Export the create function for **Node.js** or other
	// commonjs systems. Otherwise, add it as a global object to the root
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = create;
		}
		exports.create = create;
	}
	if (typeof window !== 'undefined') {
		window.wen = create;
	}
}).call(this);