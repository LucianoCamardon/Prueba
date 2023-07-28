const express = require('express');
const fs = require('fs');
const ProductManager = require('./ProductManager.js');
const app = express();
const PORT = 3000;
const manager = new ProductManager('./ProductManager.js');



app.get('/products', (req, res) => {
  fs.readFile('./products.json', 'utf8', (error, data) => {
    if (error) {
      console.error('Error leyendo el archivo:', error);
      return res.status(500).json({ error: 'Error al leer el archivo de productos' });
    }

    const products = JSON.parse(data);
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit)) {
      return res.json(products.slice(0, limit));
    } else {
      return res.json(products);
    }
  });
});

app.get('/products/:pid', (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = manager.getProductById(productId);
    return res.json(product);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});