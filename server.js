const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1000, 
  max: 5, // limit each IP to 5 requests per second
  message: 'Too many requests, please try again later.',
});
app.use(limiter);

app.post('/fetch-metadata', async (req, res) => {
  const { urls } = req.body;
  const metadataArray = [];

  for (let url of urls) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const title = $('title').text() || 'No title available';
      const description =
        $('meta[name="description"]').attr('content') || 'No description available';
      const image = $('meta[property="og:image"]').attr('content') || '';

      metadataArray.push({ title, description, image });
    } catch (error) {
      metadataArray.push({ title: 'Error to fetch - ' + url, description: 'Failed to retrieve metadata', image : 'https://img.freepik.com/premium-vector/window-operating-system-error-warning-dialog-window-popup-message-with-system-failure-flat-design_812892-54.jpg'});
    }
  }

  res.json(metadataArray);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;