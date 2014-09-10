VERSION = edge

CFLAGS = -c -g -D $(VERSION)

all:
	browserify lib/wen.js | uglifyjs -c > dist/wen.$(VERSION).min.js
	browserify lib/wen.js > dist/wen.$(VERSION).js