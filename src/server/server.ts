import process from 'process';

import {
  addToUsers,
  checkIfUserExist,
  getClothesByBrand,
  getMyBag,
  getMyFavorites,
  getClothes,
  addToOrders,
  addToCarts,
  addToFavorites,
  deleteCart,
  deleteFavorite
} from './db';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 4000;
const app = express();

// Gives all the clothes from the db.
app.get('/allClothes', (_: any, response: any) => {
  getClothes().then((cloth: any) => response.json(cloth));
});

// Gives clothes filter by brand from the db.
app.get('/clothesByBrand:brand', (req: any, response: any) => {
  const brand = req.params.brand;
  getClothesByBrand(brand).then((cloth: any) => response.json(cloth));
});

// Gives the bag of the user by user_id from the db.
app.get('/getMyBag:userId', (req: any, response: any) => {
  const userId = req.params.userId;
  getMyBag('carts', userId).then((cloth: any) => response.json(cloth));
});

// Gives the orders of the user by user_id from the db.
app.get('/getMyOrder:userId', (req: any, response: any) => {
  const userId = req.params.userId;
  getMyBag('orders', userId).then((cloth: any) => response.json(cloth));
});

// Gives the favorite clothes of the user by user_id from the db.
app.get('/getMyFavorites:userId', (req: any, response: any) => {
  const userId = req.params.userId;
  getMyFavorites(userId).then((cloth: any) => response.json(cloth));
});

app.use(express.json({
  limit: '1mb'
}));
// Add user to users table.
app.post('/addUser', async function (req: any, response: any) {
  const user = req.body;
  const result = await addToUsers(user);
  response.json(result);
});

// Delete cloth from the favorite list of the user from the db.
app.post('/deleteFavorite', (req: any, response: any) => {
  const body = req.body;
  deleteFavorite(body.clothId , body.userId).then((cloth: any) => response.json(cloth));
});

// Add cart to carts table.
app.post('/addToCarts', async function (req: any, response: any) {
  const body = req.body;
  addToCarts(body.size, body.quantity, body.userId, body.clothId).then((user: any) => response.json(user));
});

// Gives user from the db.
app.post('/addToOrders', (req: any, response: any) => {
  const body = req.body;
  addToOrders(body.size, body.quantity, body.userId, body.clothId).then((res: any) => response.json(res));
});

// Add favorite cloth to favorites table.
app.post('/addToFavorites', async function (req: any, response: any) {
  const body = req.body;
  addToFavorites(body.userId, body.clothId).then((user: any) => response.json(user));
});

// Delete cloth from the cart of the user from the db.
app.post('/deleteCart', async function (req: any, response: any) {
  const body = req.body;
  deleteCart(body.clothId, body.size, body.userId).then((cloth: any) => response.json(cloth));
});

// Gives user from the db.
app.post('/user', (req: any, response: any) => {
  const EmailAndPassword = req.body;
  checkIfUserExist(EmailAndPassword.email, EmailAndPassword.password).then((user: any) => response.json(user));
});


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (_req: any, res: any) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

app.listen(port , () => {
  console.log('listen on http://localhost:' + port);
});