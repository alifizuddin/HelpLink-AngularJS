const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Simple in-memory/file-backed storage for demo
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const helpFile = path.join(dataDir, 'help-requests.json');
const volunteerFile = path.join(dataDir, 'volunteer-applications.json');
const productsFile = path.join(dataDir, 'market-products.json');
const purchasesFile = path.join(dataDir, 'market-purchases.json');

function readJson(file, defaultValue = []) {
  try {
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, JSON.stringify(defaultValue, null, 2));
      return defaultValue;
    }
    const content = fs.readFileSync(file, 'utf8');
    return JSON.parse(content || JSON.stringify(defaultValue));
  } catch (e) {
    return defaultValue;
  }
}

function writeJson(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

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

// Help Requests API
app.post('/api/help', (req, res) => {
  try {
    const requests = readJson(helpFile, []);
    const newRequest = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'submitted',
      ...req.body
    };
    requests.push(newRequest);
    writeJson(helpFile, requests);
    res.status(201).json({ success: true, id: newRequest.id, request: newRequest });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit help request' });
  }
});

app.get('/api/help', (req, res) => {
  try {
    const requests = readJson(helpFile, []);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch help requests' });
  }
});

// Volunteer Applications API
app.post('/api/volunteer', (req, res) => {
  try {
    const applications = readJson(volunteerFile, []);
    const newApplication = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'submitted',
      ...req.body
    };
    applications.push(newApplication);
    writeJson(volunteerFile, applications);
    res.status(201).json({ success: true, id: newApplication.id, application: newApplication });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit volunteer application' });
  }
});

app.get('/api/volunteer', (req, res) => {
  try {
    const applications = readJson(volunteerFile, []);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch volunteer applications' });
  }
});

// Market Products API
app.get('/api/market/products', (req, res) => {
  try {
    const storedProducts = readJson(productsFile, []);
    res.json(storedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.post('/api/market/products', (req, res) => {
  try {
    const products = readJson(productsFile, []);
    const newProduct = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'pending_review',
      ...req.body
    };
    products.push(newProduct);
    writeJson(productsFile, products);
    res.status(201).json({ success: true, id: newProduct.id, product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to submit product' });
  }
});

// Market Purchases API
app.post('/api/market/purchase', (req, res) => {
  try {
    const purchases = readJson(purchasesFile, []);
    const newPurchase = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      ...req.body
    };
    purchases.push(newPurchase);
    writeJson(purchasesFile, purchases);
    res.status(201).json({ success: true, id: newPurchase.id, purchase: newPurchase });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to process purchase' });
  }
});

app.get('/api/market/purchases', (req, res) => {
  try {
    const purchases = readJson(purchasesFile, []);
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
