all:
	browserify lib/wen.js | uglifyjs -c > wen.edge.min.js
	browserify lib/wen.js > wen.edge.js