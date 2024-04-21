const express = require('express');
const app = express();
const port = 3001;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// ITEMS
app.get('/items', async (req, res) => {
  res.send('Get Items!')
})

app.post('/items', async (req, res) => {
  res.send('Post Items!')
})

app.put('/items', async (req, res) => {
  res.send('Update Items!')
})

app.delete('/items', async (req, res) => {
  res.send('Delete Items!')
})


// CARTS
app.get('/carts', async (req, res) => {
  res.send('Get Carts!')
})

app.post('/carts', async (req, res) => {
  res.send('Create Cart!')
})

app.put('/carts', async (req, res) => {
  res.send('Update Cart!')
})

app.delete('/carts', async (req, res) => {
  res.send('Delete Cart!')
})


// ORDERS
app.get('/orders', async (req, res) => {
  res.send('Get Orders!')
})

app.post('/orders', async (req, res) => {
  res.send('Create Order!')
})

// app.put('/orders', async (req, res) => {
//   res.send('Update Order!')
// })

// app.delete('/orders', async (req, res) => {
//   res.send('Delete Order!')
// })




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})