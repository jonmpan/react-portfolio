import { Router } from "express";
import fs, { createReadStream } from "fs";
// import awsConfig from "../../aws-config.json";

export default ({ config }) => {
  let api = Router();
  var AWS = require("aws-sdk");

  AWS.config.accessKeyId = process.env.S3_KEY;
  AWS.config.secretAccessKey = process.env.S3_SECRET; // prettier-ignore
  //   AWS.config.accessKeyId = process.env.S3_KEY || awsConfig.accessKeyId;
  //   AWS.config.secretAccessKey = process.env.S3_SECRET || awsConfig.secretAccessKey; // prettier-ignore
  AWS.config.region = "us-west-2";

  var polly = new AWS.Polly();

  api.get("/", async (req, res) => {
    var voice = req.query.voice ? req.query.voice.toLowerCase() : null;
    var params = {
      OutputFormat: "mp3",
      Text: req.query.text,
      TextType: "text",
      VoiceId: voices[voice] || "Joanna",
    };

    polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.set("Content-Type", "audio/mp3");
        res.send(data.AudioStream);
      }
    });
  });

  api.post("/", async (req, res) => {
    var voice = req.body.voice ? req.body.voice.toLowerCase() : null;
    var params = {
      OutputFormat: "mp3",
      Text: req.body.text,
      TextType: "text",
      VoiceId: voices[voice] || "Joanna",
    };

    polly.synthesizeSpeech(params, function(err, data) {
      if (err) {
        console.log(err);
      } else {
        res.set("Content-Type", "audio/mp3");
        res.send(data.AudioStream);
      }
    });
  });

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
  zhiyu: "Zhiyu",
};
