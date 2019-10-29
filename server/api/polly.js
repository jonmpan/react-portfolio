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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import awsConfig from "../../aws-config.json";

exports.default = function (_ref) {
  var config = _ref.config;

  var api = (0, _express.Router)();
  var AWS = require("aws-sdk");

  AWS.config.accessKeyId = process.env.S3_KEY;
  AWS.config.secretAccessKey = process.env.S3_SECRET; // prettier-ignore
  //   AWS.config.accessKeyId = process.env.S3_KEY || awsConfig.accessKeyId;
  //   AWS.config.secretAccessKey = process.env.S3_SECRET || awsConfig.secretAccessKey; // prettier-ignore
  AWS.config.region = "us-west-2";

  var polly = new AWS.Polly();

  api.get("/", function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var voice, params;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              voice = req.query.voice ? req.query.voice.toLowerCase() : null;
              params = {
                OutputFormat: "mp3",
                Text: req.query.text,
                TextType: "text",
                VoiceId: voices[voice] || "Joanna"
              };


              polly.synthesizeSpeech(params, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  res.set("Content-Type", "audio/mp3");
                  res.send(data.AudioStream);
                }
              });

            case 3:
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

  api.post("/", function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
      var voice, params;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              voice = req.body.voice ? req.body.voice.toLowerCase() : null;
              params = {
                OutputFormat: "mp3",
                Text: req.body.text,
                TextType: "text",
                VoiceId: voices[voice] || "Joanna"
              };


              polly.synthesizeSpeech(params, function (err, data) {
                if (err) {
                  console.log(err);
                } else {
                  res.set("Content-Type", "audio/mp3");
                  res.send(data.AudioStream);
                }
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());

  return api;
};

var voices = {
  aditi: "Aditi",
  amy: "Amy",
  astrid: "Astrid",
  bianca: "Bianca",
  brian: "Brian",
  camila: "Camila",
  carla: "Carla",
  carmen: "Carmen",
  celine: "Celine",
  chantal: "Chantal",
  conchita: "Conchita",
  cristiano: "Cristiano",
  dora: "Dora",
  emma: "Emma",
  enrique: "Enrique",
  ewa: "Ewa",
  filiz: "Filiz",
  geraint: "Geraint",
  giorgio: "Giorgio",
  gwyneth: "Gwyneth",
  hans: "Hans",
  ines: "Ines",
  ivy: "Ivy",
  jacek: "Jacek",
  jan: "Jan",
  joanna: "Joanna",
  joey: "Joey",
  justin: "Justin",
  karl: "Karl",
  kendra: "Kendra",
  kimberly: "Kimberly",
  lea: "Lea",
  liv: "Liv",
  lotte: "Lotte",
  lucia: "Lucia",
  lupe: "Lupe",
  mads: "Mads",
  maja: "Maja",
  marlene: "Marlene",
  mathieu: "Mathieu",
  matthew: "Matthew",
  maxim: "Maxim",
  mia: "Mia",
  miguel: "Miguel",
  mizuki: "Mizuki",
  naja: "Naja",
  nicole: "Nicole",
  penelope: "Penelope",
  raveena: "Raveena",
  ricardo: "Ricardo",
  ruben: "Ruben",
  russell: "Russell",
  salli: "Salli",
  seoyeon: "Seoyeon",
  takumi: "Takumi",
  tatyana: "Tatyana",
  vicki: "Vicki",
  vitoria: "Vitoria",
  zeina: "Zeina",
  zhiyu: "Zhiyu"
};
//# sourceMappingURL=polly.js.map