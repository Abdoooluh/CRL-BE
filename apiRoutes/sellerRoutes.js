const express = require('express');
const WholesellerAPIs = require('./WholesellerAPIs'); // Import Wholeseller APIs

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON requests

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Example routes for CRUD operations on sellers using specific endpoint paths

// Get all sellers
app.get('/getSellers', async (req, res) => {
  try {
    const sellers = await WholesellerAPIs.getAllWholesellers();
    res.json(sellers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a seller by ID
app.get('/getSingleSeller/:id', async (req, res) => {
  const sellerId = req.params.id;

  try {
    const seller = await WholesellerAPIs.getWholesellerById(sellerId);

    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.json(seller);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new seller
app.post('/createSeller', async (req, res) => {
  const sellerData = req.body;

  try {
    const newSeller = await WholesellerAPIs.createWholeseller(sellerData);
    res.json(newSeller);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a seller by ID
app.put('/updateSeller/:id', async (req, res) => {
  const sellerId = req.params.id;
  const sellerData = req.body;

  try {
    const updatedSeller = await WholesellerAPIs.updateWholeseller(sellerId, sellerData);

    if (!updatedSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.json(updatedSeller);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a seller by ID
app.delete('/deleteSeller/:id', async (req, res) => {
  const sellerId = req.params.id;

  try {
    const deletedSeller = await WholesellerAPIs.deleteWholeseller(sellerId);

    if (!deletedSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }

    res.json(deletedSeller);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
