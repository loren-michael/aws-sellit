const express = require('express');
const app = express();
const port = 3001;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// ITEMS
app.get('/items', async (req, res) => {
  res.send('Hello World!')
})

app.post('/items', async (req, res) => {
  res.send('Hello World!')
})

app.put('/items', async (req, res) => {
  res.send('Hello World!')
})

app.delete('/items', async (req, res) => {
  res.send('Hello World!')
})


// CARTS
app.get('/carts', async (req, res) => {
  res.send('Hello World!')
})

app.post('/carts', async (req, res) => {
  res.send('Hello World!')
})

app.put('/carts', async (req, res) => {
  res.send('Hello World!')
})

app.delete('/carts', async (req, res) => {
  res.send('Hello World!')
})


// ORDERS
app.get('/orders', async (req, res) => {
  res.send('Hello World!')
})

app.post('/orders', async (req, res) => {
  res.send('Hello World!')
})

app.put('/orders', async (req, res) => {
  res.send('Hello World!')
})

app.delete('/orders', async (req, res) => {
  res.send('Hello World!')
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})