'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config;

  var api = (0, _express.Router)();

  api.get('/:fileName', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var fileName, range, file, stats, size, _range$replace$split, _range$replace$split2, start, end;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              fileName = req.params.fileName;
              range = req.headers.range;
              file = __dirname + ('/../assets/audio/' + fileName);
              stats = _fs2.default.statSync(file);
              size = stats.size;

              if (range) {
                _range$replace$split = range.replace(/bytes=/, '').split('-'), _range$replace$split2 = (0, _slicedToArray3.default)(_range$replace$split, 2), start = _range$replace$split2[0], end = _range$replace$split2[1];

                start = parseInt(start, 10);
                end = end ? parseInt(end, 10) : size - 1;
                res.writeHead(206, {
                  'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
                  'Accept-Ranges': 'bytes',
                  'Content-Length': end - start + 1,
                  'Content-Type': 'audio/mp3'
                });
                _fs2.default.createReadStream(file, { start: start, end: end }).pipe(res);
              } else {
                res.writeHead(200, {
                  'Content-Length': size,
                  'Content-Type': 'audio/mp3'
                });
                _fs2.default.createReadStream(file).pipe(res);
              }

            case 6:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=ambience.js.map