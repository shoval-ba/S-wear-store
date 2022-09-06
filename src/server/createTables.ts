import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config()

const DATABASE_URL = process.env.DATABASE_URL
export const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

async function initDb() {

  // Drop table
  let sql = 'DROP TABLE IF EXISTS clothes , users , orders;'
  await client.query(sql)
  await client.query(
      `CREATE TABLE IF NOT EXISTS clothes(
          cloth_id SERIAL PRIMARY KEY,
          brand TEXT NOT NULL,
          sector TEXT NOT NULL,
          title TEXT NOT NULL,
          price FLOAT NOT NULL,
          img TEXT NOT NULL,
          variants JSON[] NOT NULL,
          sizes JSON NOT NULL
      );`
      );

  await client.query(
      `CREATE TABLE IF NOT EXISTS users(
          user_id SERIAL PRIMARY KEY,
          first_name TEXT NOT NULL,
          last_name TEXT NOT NULL,
          phone_number INTEGER NOT NULL,
          city TEXT NOT NULL,
          adress TEXT NOT NULL,
          email TEXT NOT NULL,
          password INTEGER NOT NULL
      );`
      );

  await client.query(
      `CREATE TABLE IF NOT EXISTS orders(
          order_id SERIAL PRIMARY KEY,
          size INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          user_id INTEGER,
          cloth_id INTEGER,
          CONSTRAINT FK_userID FOREIGN KEY(user_id)
          REFERENCES users(user_id), 
          CONSTRAINT FK_clothId FOREIGN KEY(cloth_id)
          REFERENCES clothes(cloth_id)
      );`
      );
      console.log("create")
}

// initDb();

interface cloth2{
  brand:string
  sector:string
  title: string
  price: number
  img: string
  variants: []
  sizes:{}
}

let pants: any[] = [];
let jackets: any[] = [];
let shirts:any[]=[];
let dresses:any[]=[];
let shoes:any[]=[];
let jeanses:any[]=[]
let allClothes :any[]= [];

async function getPants(){
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
    params: {query: 'pants', rows: '80', start: '0'},
    headers: {
      'X-RapidAPI-Key': '31dc46645fmsha8c5da48b74c236p1ea83bjsne1cb7f2aaa3a',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response: { data: any; }) {
    pants = response.data.response.docs;
    let sizes;
    for(let pant of pants){
      if(pant.brand == "21MEN") pant.brand = "MEN";
      if(pant.brand == "Forever 21") pant.brand = "WOMEN"
      if(pant.brand == "Forever 21 Girls") pant.brand = "KIDS"
      if(pant.brand == "PLUS") {
        sizes= {
          40: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
          44: Math.floor(Math.random()*50),
          46: Math.floor(Math.random()*50),
          48: Math.floor(Math.random()*50),
        }
      }
      else {
        sizes = {
          32: Math.floor(Math.random()*50),
          34: Math.floor(Math.random()*50),
          36: Math.floor(Math.random()*50),
          38: Math.floor(Math.random()*50),
          40: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
          44: Math.floor(Math.random()*50),
        }
      }
      const pantInterface: cloth2 = {
        brand: pant.brand,
        sector:"pants",
        title: pant.title,
        price: pant.price,
        img: pant.thumb_image,
        variants: pant.variants,
        sizes: sizes
        }
        allClothes.push(pantInterface)
      }

  }).catch(function (error: any) {
    console.error(error);
  });
}

async function getJackets(){
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
    params: {query: 'jackets', rows: '60', start: '0'},
    headers: {
      'X-RapidAPI-Key': '31dc46645fmsha8c5da48b74c236p1ea83bjsne1cb7f2aaa3a',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response: { data: any; }) {
    jackets = response.data.response.docs;
    let sizes;
    for(let jacket of jackets){
      if(jacket.brand == "21MEN") jacket.brand = "MEN";
      if(jacket.brand == "Forever 21") jacket.brand = "WOMEN"
      if(jacket.brand == "Forever 21 Girls") jacket.brand = "KIDS"
      if(jacket.brand == "PLUS") {
        sizes= {
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
          xxl: Math.floor(Math.random()*50),
        }
      }
      else {
        sizes = {
          xs: Math.floor(Math.random()*50),
          s: Math.floor(Math.random()*50),
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
        }
      }
      const jacketInterface: cloth2 = {
        brand: jacket.brand,
        sector:"jackets",
        title: jacket.title,
        price: jacket.price,
        img: jacket.thumb_image,
        variants: jacket.variants,
        sizes: sizes
        }
        allClothes.push(jacketInterface)
      }

  }).catch(function (error: any) {
    console.error(error);
  });
}

async function getShirts(){
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
    params: {query: 'T-shirts', rows: '60', start: '0'},
    headers: {
      'X-RapidAPI-Key': '31dc46645fmsha8c5da48b74c236p1ea83bjsne1cb7f2aaa3a',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response: { data: any; }) {
    shirts = response.data.response.docs;
    let sizes;
    for(let shirt of shirts){
      if(shirt.brand == "21MEN") shirt.brand = "MEN";
      if(shirt.brand == "Forever 21") shirt.brand = "WOMEN"
      if(shirt.brand == "Forever 21 Girls") shirt.brand = "KIDS"
      if (shirt.brand == "PLUS") {
        sizes = {
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
          xxl: Math.floor(Math.random()*50),
        }
      }
      else {
        sizes = {
          xs: Math.floor(Math.random()*50),
          s: Math.floor(Math.random()*50),
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
        }
      }
      const shirtInterface: cloth2 = {
        brand: shirt.brand,
        sector:"T-Shirts",
        title: shirt.title,
        price: shirt.price,
        img: shirt.thumb_image,
        variants: shirt.variants,
        sizes: sizes
        }
        allClothes.push(shirtInterface)
      }

  }).catch(function (error: any) {
    console.error(error);
  });
}

async function getDresses(){
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
    params: {query: 'dresses', rows: '60', start: '0'},
    headers: {
      'X-RapidAPI-Key': '31dc46645fmsha8c5da48b74c236p1ea83bjsne1cb7f2aaa3a',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response: { data: any; }) {
    dresses = response.data.response.docs;
    let sizes;
    for(let dress of dresses){
      if(dress.brand == "21MEN") dress.brand = "MEN";
      if(dress.brand == "Forever 21") dress.brand = "WOMEN"
      if(dress.brand == "Forever 21 Girls") dress.brand = "KIDS"
      if (dress.brand == "PLUS") {
        sizes = {
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
          xxl: Math.floor(Math.random()*50),
        }
      }
      else {
        sizes = {
          xs: Math.floor(Math.random()*50),
          s: Math.floor(Math.random()*50),
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
        }
      }
      const dressInterface: cloth2 = {
        brand: dress.brand,
        sector:"dresses",
        title: dress.title,
        price: dress.price,
        img: dress.thumb_image,
        variants: dress.variants,
        sizes: sizes
        }
        allClothes.push(dressInterface)
      }

  }).catch(function (error: any) {
    console.error(error);
  });
}
  
async function getShoes(){
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
    params: {query: 'shoes', rows: '60', start: '0'},
    headers: {
      'X-RapidAPI-Key': '31dc46645fmsha8c5da48b74c236p1ea83bjsne1cb7f2aaa3a',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(async function (response: { data: any; }) {
    shoes = response.data.response.docs;
    for(let shoe of shoes){
      if(shoe.brand == "21MEN") shoe.brand = "MEN";
      if(shoe.brand == "Forever 21") shoe.brand = "WOMEN"
      if(shoe.brand == "Forever 21 Girls") shoe.brand = "KIDS"
      const shoeInterface: cloth2 = {
        brand: shoe.brand,
        sector:"shoes",
        title: shoe.title,
        price: shoe.price,
        img: shoe.thumb_image,
        variants: shoe.variants,
        sizes: {
          36: Math.floor(Math.random()*50),
          37: Math.floor(Math.random()*50),
          38: Math.floor(Math.random()*50),
          39: Math.floor(Math.random()*50),
          40: Math.floor(Math.random()*50),
          41: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
        }
        }
        allClothes.push(shoeInterface)
      }
      let i =0;
      for(let cloth of allClothes){
        console.log(i)
        i++
        const clothArray = Object.values(cloth);
        const sql = 'INSERT INTO clothes(brand ,sector ,title , price , img , variants, sizes ) VALUES($1, $2, $3, $4, $5, $6, $7 )';
        await client.query(sql, clothArray);
      }
      console.log('insert')

  }).catch(function (error: any) {
    console.error(error);
  });
}
  
async function getJeanses(){
  const axios = require("axios");

  const options = {
    method: 'GET',
    url: 'https://apidojo-forever21-v1.p.rapidapi.com/products/search',
    params: {query: 'jeans', rows: '60', start: '0'},
    headers: {
      'X-RapidAPI-Key': '31dc46645fmsha8c5da48b74c236p1ea83bjsne1cb7f2aaa3a',
      'X-RapidAPI-Host': 'apidojo-forever21-v1.p.rapidapi.com'
    }
  };

  axios.request(options).then(async function (response: { data: any; }) {
    jeanses = response.data.response.docs;
    let sizes;
    for(let jeans of jeanses){
      if(jeans.brand == "21MEN") jeans.brand = "MEN";
      if(jeans.brand == "FOREVER 21") jeans.brand = "WOMEN"
      if(jeans.brand == "FOREVER 21 GIRLS") jeans.brand = "KIDS"
      if(jeans.brand == "PLUS") {
        sizes= {
          40: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
          44: Math.floor(Math.random()*50),
          46: Math.floor(Math.random()*50),
          48: Math.floor(Math.random()*50),
        }
      }
      else {
        sizes = {
          32: Math.floor(Math.random()*50),
          34: Math.floor(Math.random()*50),
          36: Math.floor(Math.random()*50),
          38: Math.floor(Math.random()*50),
          40: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
          44: Math.floor(Math.random()*50),
        }
      }
      const jeansInterface: cloth2 = {
        brand: jeans.brand,
        sector:"jeans",
        title: jeans.title,
        price: jeans.price,
        img: jeans.thumb_image,
        variants: jeans.variants,
        sizes: sizes
        }
        allClothes.push(jeansInterface)
      }

  }).catch(function (error: any) {
    console.error(error);
  });
}
  

async function insertClothes(){
  await initDb();
  await getPants();
  await getJackets();
  await getShirts();
  await getDresses();
  await getShoes();
}

insertClothes();