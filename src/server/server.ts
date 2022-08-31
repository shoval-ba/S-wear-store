import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { getClothes } from './db';
const app =express();

app.use(cors())
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
import { addToUsers , checkIfUserExist , getClothesByBrand , getClothesBySector} from './db'
// app.use('/', express.static(path.join(__dirname, '../client')));
// app.get('/', function(_req :any, res:any) { // serve main path as static file
//   res.sendFile(path.join(__dirname, '../client/index.html'));
// });

// Gives clothes from the db.
app.get('/allClothes', (_: any, response: any) => {
  getClothes().then((cloth) => response.json(cloth));
});

// Gives clothes from the db.
app.get('/clothesByBrand:brand', (req: any, response: any) => {
  let brand = req.params.brand;
  getClothesByBrand(brand).then((cloth) => response.json(cloth));
});

// Gives clothes from the db.
app.get('/clothesBySector:sector', (req: any, response: any) => {
  let sector = req.params.sector;
  getClothesBySector(sector).then((cloth) => response.json(cloth));
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
  checkIfUserExist(EmailAndPassword.email , EmailAndPassword.password).then((user) => response.json(user));
});


app.listen( process.env.PORT || 4000, () => {
  console.log('listen to port 4000');
});

if (process.env.NODE_ENV === "production") {
  const root = path.join(__dirname, "client");
  app.use(express.static(root));
  app.get("*", (req, res) => {
    res.sendFile("index.html", { root });
  });
}
app.use("*", (req, res) => res.status(404).send("page not found"));

