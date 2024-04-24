import express from 'express';
import { fetchItems, createItem, updateItem, deleteItem } from './item';
import { fetchCarts, createCart, updateCart, deleteCart } from './cart';
import { fetchOrders, createOrder } from './order';
import serverless from 'serverless-http';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json())

if (process.env.DEVELOPMENT) {
  app.use(cors());
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// USERS

app.get('/login', async (req, res) => {
  try {
    const user = await fetchUser(username, password_digest);
    res.send({
      "username": username,
      "password_digest": password_digest
    })
  } catch (err) {

  }
});



// ITEMS
app.get('/items', async (req, res) => {
  try {
    const items = await fetchItems();
    res.send(items)
  } catch (err) {
    res.status(400).send(`Error fetching items: ${err}`)
  }
})

app.post('/items', async (req, res) => {
  try {
    const item = req.body;
    const response = await createItem(item);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating item: ${err}`)
  }
})

app.put('/items', async (req, res) => {
  try {
    const item = req.body;
    const response = await updateItem(item);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error updating item: ${err}`)
  }
})

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteItem(id);
    res.send(response)
  } catch (err) {
    res.status(400).send(`Error deleting item: ${err}`)
  }
})


// CARTS
app.get('/carts', async (req, res) => {
  try {
    const items = await fetchCarts();
    res.send(items)
  } catch (err) {
    res.status(400).send(`Error fetching carts: ${err}`)
  }
})

app.post('/carts', async (req, res) => {
  try {
    const cart = req.body;
    const response = await createCart(cart);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating cart: ${err}`)
  }
})

app.put('/carts', async (req, res) => {
  try {
    const cart = req.body;
    const response = await updateCart(cart);
    res.send(response)
  } catch (err) {
    res.status(400).send(`Error updating cart: ${err}`)
  }
})

app.delete('/carts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteCart(id);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error deleting cart: ${err}`)
  }
})


// ORDERS
app.get('/orders', async (req, res) => {
  try {
    const items = await fetchOrders();
    res.send(items)
  } catch (err) {
    res.status(400).send(`Error fetching orders: ${err}`)
  }
})

app.post('/orders', async (req, res) => {
  try {
    const cart = req.body;
    const response = await createOrder(cart);
    res.send(response);
  } catch (err) {
    res.status(400).send(`Error creating order: ${err}`)
  }
})

// app.put('/orders', async (req, res) => {
//   res.send('Update Order!')
// })

// app.delete('/orders', async (req, res) => {
//   res.send('Delete Order!')
// })

if (process.env.DEVELOPMENT) {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

export const handler = serverless(app)