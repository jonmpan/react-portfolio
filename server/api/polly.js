"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require("express");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _awsConfig = require("../../aws-config.json");

var _awsConfig2 = _interopRequireDefault(_awsConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config;

  var api = (0, _express.Router)();
  var AWS = require("aws-sdk");

  AWS.config.accessKeyId = process.env.S3_KEY || _awsConfig2.default.accessKeyId;
  AWS.config.secretAccessKey = process.env.S3_SECRET || _awsConfig2.default.secretAccessKey; // prettier-ignore
  AWS.config.region = "us-west-2";

  var polly = new AWS.Polly();

  api.post("/", function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var params, range;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              console.log(req.body);
              params = {
                OutputFormat: "mp3",
                Text: req.body.text,
                TextType: "text",
                VoiceId: voices[req.body.voice] || "Joanna"
              };
              range = req.headers.range;


              polly.synthesizeSpeech(params, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  res.set("Content-Type", "audio/mp3");
                  res.send(data.AudioStream);
                }
              });

            case 4:
            case "end":
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

var voices = {
  Aditi: "Aditi",
  Amy: "Amy",
  Astrid: "Astrid",
  Bianca: "Bianca",
  Brian: "Brian",
  Camila: "Camila",
  Carla: "Carla",
  Carmen: "Carmen",
  Celine: "Celine",
  Chantal: "Chantal",
  Conchita: "Conchita",
  Cristiano: "Cristiano",
  Dora: "Dora",
  Emma: "Emma",
  Enrique: "Enrique",
  Ewa: "Ewa",
  Filiz: "Filiz",
  Geraint: "Geraint",
  Giorgio: "Giorgio",
  Gwyneth: "Gwyneth",
  Hans: "Hans",
  Ines: "Ines",
  Ivy: "Ivy",
  Jacek: "Jacek",
  Jan: "Jan",
  Joanna: "Joanna",
  Joey: "Joey",
  Justin: "Justin",
  Karl: "Karl",
  Kendra: "Kendra",
  Kimberly: "Kimberly",
  Lea: "Lea",
  Liv: "Liv",
  Lotte: "Lotte",
  Lucia: "Lucia",
  Lupe: "Lupe",
  Mads: "Mads",
  Maja: "Maja",
  Marlene: "Marlene",
  Mathieu: "Mathieu",
  Matthew: "Matthew",
  Maxim: "Maxim",
  Mia: "Mia",
  Miguel: "Miguel",
  Mizuki: "Mizuki",
  Naja: "Naja",
  Nicole: "Nicole",
  Penelope: "Penelope",
  Raveena: "Raveena",
  Ricardo: "Ricardo",
  Ruben: "Ruben",
  Russell: "Russell",
  Salli: "Salli",
  Seoyeon: "Seoyeon",
  Takumi: "Takumi",
  Tatyana: "Tatyana",
  Vicki: "Vicki",
  Vitoria: "Vitoria",
  Zeina: "Zeina",
  Zhiyu: "Zhiyu"
};
//# sourceMappingURL=polly.js.map