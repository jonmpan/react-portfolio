import { Router } from 'express';
import fs, { createReadStream } from 'fs';

export default ({ config }) => {
  let api = Router();

  api.get('/:fileName', async (req, res) => {
    const fileName = req.params.fileName;
    const range = req.headers.range;
    const file = __dirname + `/../assets/audio/${fileName}`;
    const stats = fs.statSync(file);
    const size = stats.size;
    if (range) {
      let [start, end] = range.replace(/bytes=/, '').split('-');
      start = parseInt(start, 10);
      end = end ? parseInt(end, 10) : size - 1;
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Content-Type': 'audio/mp3',
      });
      fs.createReadStream(file, { start, end }).pipe(res);
    } else {
      res.writeHead(200, {
        'Content-Length': size,
        'Content-Type': 'audio/mp3',
      });
      fs.createReadStream(file).pipe(res);
    }
  });

  return api;
};
