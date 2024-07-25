  import express from 'express';
  import Vibrant from 'node-vibrant';
  import axios from 'axios';
  import { Buffer } from 'buffer';
  import cors from 'cors';  // Добавляем импорт cors

  const app = express();

  app.use(cors());  // Разрешаем запросы с других доменов

  app.get('/extract-colors', async (req, res) => {
    const imageUrl = req.query.url;
    try {
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data, 'binary');
      const palette = await Vibrant.from(buffer).getPalette();
      const colors = {
        vibrant: palette.Vibrant.getHex(),
        muted: palette.Muted.getHex(),
      };
      res.json(colors);
    } catch (error) {
      res.status(500).send('Error processing image');
    }
  });

  app.listen(3001, () => {
    console.log('Server listening on port 3001');
  });
