import express from 'express';
import axios from 'axios';
import querystring from 'querystring';
import cors from 'cors';
import btoa from 'btoa';

const app = express();
const port = 5000;

app.use(cors());

const client_id = '957521439fb84c85ba83ba571577e562'; // Ваш Client ID
const client_secret = '7dfc7dfdf8494e0ab032db7ed29b8871'; // Ваш Client Secret
const redirect_uri = 'http://localhost:5000/callback'; // Ваш Redirect URI

let access_token = 'BQAb-CPsG_P7rbILnGxtDw-3mcFwBz-Ohy_ihfCoR4nF86TLScMQ16EyUyuFW2WNqW0gCnT8b5CMfgOus-wTeA5ebYwOuiV0W5EoUU3g2T_ST25faSm7Qe2FTp-3oZq85jeq7UPEM4UYmwdt6EcmmxzYSqYbPbUUxFtagr07hHWy0gMz4PGqIUYuNetEkoEEmqnNKsiFHQI';
let refresh_token = 'AQCYBVejRizK66W1HMZw-TJh3vQ9N-n8rI2gCqjMx0K12UoGOfC2hdIG2qOLTxusIJAyv-pQkOg3syHKYNiaxoWpwyovS6vSMC6jlBqLnJDbJ_ImT02eFhJQsL75k7QUTcg';
const token = 'Basic ' + btoa(client_id + ':' + client_secret);

// Эндпоинт для получения токенов
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;

  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
      client_id: client_id,
      client_secret: client_secret,
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    access_token = response.data.access_token;
    refresh_token = response.data.refresh_token;

    console.log('Access Token:', access_token);
    console.log('Refresh Token:', refresh_token);
    res.send('Access Token obtained. You can close this window.');
  } catch (error) {
    console.error('Error getting new tokens:', error.response ? error.response.data : error.message);
    res.status(500).send('Error getting tokens');
  }
});

// Функция для обновления токена
const refreshAuthToken = async () => {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }), {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });

    access_token = response.data.access_token;
    console.log('Access Token refreshed:', access_token);
  } catch (error) {
    console.error('Error refreshing token:', error.response ? error.response.data : error.message);
  }
};

// Запускаем обновление токена каждые 50 минут
const refreshInterval = 50 * 60 * 1000; // 50 минут в миллисекундах
setInterval(refreshAuthToken, refreshInterval);

// Эндпоинт для получения текущего трека
app.get('/current-track', async (req, res) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    });

    if (response.data && response.data.item) {
      const { name: title, artists, album, duration_ms } = response.data.item;
      const progress_ms = response.data.progress_ms || 0;
      const is_playing = response.data.is_playing || false;

      res.json({
        track: {
          title,
          artist: artists.map(artist => artist.name).join(', '),
          album: album.name,
          cover: album.images[0]?.url || null,
          progress_ms,
          duration_ms,
          is_playing
        }
      });
    } else {
      res.json({ error: 'В данный момент, ничего не играет :(' });
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Если ошибка 401, попробуйте обновить токен
      try {
        await refreshAuthToken();
        // Попробуйте снова получить текущий трек с новым токеном
        const retryResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (retryResponse.data && retryResponse.data.item) {
          const { name: title, artists, album, duration_ms } = retryResponse.data.item;
          const progress_ms = retryResponse.data.progress_ms || 0;
          const is_playing = retryResponse.data.is_playing || false;

          res.json({
            track: {
              title,
              artist: artists.map(artist => artist.name).join(', '),
              album: album.name,
              cover: album.images[0]?.url || null,
              progress_ms,
              duration_ms,
              is_playing
            }
          });
        } else {
          res.json({ error: 'В данный момент, ничего не играет :(' });
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError.response ? refreshError.response.data : refreshError.message);
        res.status(500).send('Error refreshing token');
      }
    } else if (error.response && error.response.status === 400) {
      // Если ошибка 400, обновите токен и повторите запрос
      try {
        await refreshAuthToken();
        // Попробуйте снова получить текущий трек с новым токеном
        const retryResponse = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
          headers: {
            'Authorization': `Bearer ${access_token}`
          }
        });

        if (retryResponse.data && retryResponse.data.item) {
          const { name: title, artists, album, duration_ms } = retryResponse.data.item;
          const progress_ms = retryResponse.data.progress_ms || 0;
          const is_playing = retryResponse.data.is_playing || false;

          res.json({
            track: {
              title,
              artist: artists.map(artist => artist.name).join(', '),
              album: album.name,
              cover: album.images[0]?.url || null,
              progress_ms,
              duration_ms,
              is_playing
            }
          });
        } else {
          res.json({ error: 'В данный момент, ничего не играет :(' });
        }
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError.response ? refreshError.response.data : refreshError.message);
        res.status(500).send('Error refreshing token');
      }
    } else {
      console.error('Error fetching current track:', error.response ? error.response.data : error.message);
      res.status(error.response ? error.response.status : 500).json({ error: 'Error fetching current track' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});


