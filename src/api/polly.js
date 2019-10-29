import { Router } from "express";
import fs, { createReadStream } from "fs";
import awsConfig from "../../aws-config.json";

export default ({ config }) => {
  let api = Router();
  var AWS = require("aws-sdk");

  AWS.config.accessKeyId = process.env.S3_KEY || awsConfig.accessKeyId;
  AWS.config.secretAccessKey = process.env.S3_SECRET || awsConfig.secretAccessKey; // prettier-ignore
  AWS.config.region = "us-west-2";

  var polly = new AWS.Polly();

  api.post("/", async (req, res) => {
    console.log(req.body);
    var params = {
      OutputFormat: "mp3",
      Text: req.body.text,
      TextType: "text",
      VoiceId: voices[req.body.voice] || "Joanna",
    };
    const range = req.headers.range;

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
  Zhiyu: "Zhiyu",
};
