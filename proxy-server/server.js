require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// OpenStreetMap Nominatim search (food banks)
app.get('/search', async (req, res) => {
  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: req.query.q,
        format: 'json'
      },
      headers: {
        // Nominatim requires a descriptive User-Agent identifying the app
        'User-Agent': 'HelpLink/1.0 (poverty support web app)'
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data from OpenStreetMap' });
  }
});

// GNews (poverty news)
app.get('/news', async (req, res) => {
  try {
    const response = await axios.get('https://gnews.io/api/v4/search', {
      params: {
        q: req.query.q || 'poverty',
        lang: req.query.lang || 'en',
        country: req.query.country || 'us',
        max: req.query.max || 3,
        token: process.env.GNEWS_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching news from GNews' });
  }
});

// JSearch (jobs)
app.get('/jobs', async (req, res) => {
  try {
    const response = await axios.get('https://jsearch.p.rapidapi.com/search', {
      params: {
        query: req.query.query,
        country: req.query.country || 'MY',
        page: req.query.page || 1
      },
      headers: {
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.JSEARCH_API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching jobs from JSearch' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
