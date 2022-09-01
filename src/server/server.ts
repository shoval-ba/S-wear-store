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

import { addToUsers , checkIfUserExist , getClothesByBrand , getClothesBySector , getClothes} from './db'

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
app.get('/clothesBySector:sector', (req: any, response: any) => {
  let sector = req.params.sector;
  getClothesBySector(sector).then((cloth: any) => response.json(cloth));
});


app.use(express.json({limit: '1mb'}));
// Add to users table.
app.post('/addUser', async function (req :any, response:any){
  const user = req.body;
  const result = await addToUsers(user);
  response.json(result)
});

// Gives user from the db.
app.post('/user', (req: any, response: any) => {
  const EmailAndPassword = req.body;
  checkIfUserExist(EmailAndPassword.email , EmailAndPassword.password).then((user: any) => response.json(user));
});

app.listen(port || 4000, () => {
  console.log('listen to port 4000');
});