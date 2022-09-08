import process from "process";

const express = require('express');
const path = require('path');
const port =process.env.PORT||4000;
const app = express();

if (process.env.NODE_ENV==='production'){
  app.use(express.static('build'))
  app.get('/',(_req:any,res:any)=>{
    res.sendFile(path.resolve(__dirname,'build', 'index.html'))
  })
}

import { addToUsers , checkIfUserExist , getClothesByBrand , getMyBag , 
  getMyFavorites , getClothes , addToOrders , addToCarts , addToFavorites ,
  deleteCart , deleteFavorite} from './db'

// Gives clothes from the db.
app.get('/allClothes', (_: any, response: any) => {
  getClothes().then((cloth: any) => response.json(cloth));
});

// Gives clothes from the db.
app.get('/clothesByBrand:brand', (req: any, response: any) => {
  let brand = req.params.brand;
  getClothesByBrand(brand).then((cloth: any) => response.json(cloth));
});

// Gives clothes from the db.
app.get('/getMyBag:userId', (req: any, response: any) => {
  let userId = req.params.userId;
  getMyBag(userId).then((cloth: any) => response.json(cloth));
});

// Gives clothes from the db.
app.delete('/deleteCart:clothId', (req: any, response: any) => {
  let clothId = req.params.clothId;
  deleteCart(clothId).then((cloth: any) => response.json(cloth));
});

// Gives clothes from the db.
app.delete('/deleteFavorite:clothId', (req: any, response: any) => {
  let clothId = req.params.clothId;
  deleteFavorite(clothId).then((cloth: any) => response.json(cloth));
});

// Gives clothes from the db.
app.get('/getMyFavorites:userId', (req: any, response: any) => {
  let userId = req.params.userId;
  getMyFavorites(userId).then((cloth: any) => response.json(cloth));
});

app.use(express.json({limit: '1mb'}));
// Add to users table.
app.post('/addUser', async function (req :any, response:any){
  const user = req.body;
  const result = await addToUsers(user);
  response.json(result)
});

// Add to users table.
app.post('/addToCarts', async function (req :any, response:any){
  const body = req.body;
  addToCarts(body.size , body.quantity , body.userId , body.clothId).then((user: any) => response.json(user));
});

app.post('/addToFavorites', async function (req :any, response:any){
  const body = req.body;
  addToFavorites(body.userId , body.clothId).then((user: any) => response.json(user));
});

// Gives user from the db.
app.post('/user', (req: any, response: any) => {
  const EmailAndPassword = req.body;
  checkIfUserExist(EmailAndPassword.email , EmailAndPassword.password).then((user: any) => response.json(user));
});

// Gives user from the db.
app.post('/addToOrders', (req: any, response: any) => {
  const body = req.body;
  addToOrders(body.size , body.quantity , body.userId , body.clothId).then((user: any) => response.json(user));
});

app.listen(port || 4000, () => {
  console.log('listen to port 4000');
});