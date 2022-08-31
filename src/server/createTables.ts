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

let clothes = [
  {
    model: "Adidas", 
    color: "black",
    sector: "T-Shirt",
    title: "ADICOLOR ESSENTIALS CROPPED TEE" ,
    price :15 ,
    img : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7d1f6e96a79b4827aca3ad0b00cb787f_9366/Adicolor_Essentials_Cropped_Tee_Black_H37882_21_model.jpg",
    sizes : 
      {
        xs:5,
        s: 20,
        m:15,
        l:2,
        xl:7
      }
    ,
  },
  {
    model: "Adidas", 
    color: "pink",
    sector: "T-Shirt",
    title: "CROPPED TEE" ,
    price :15 ,
    img : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3d2333be75b449409fefae3500de8723_9366/Cropped_Tee_Beige_HE9542_21_model.jpg",
    sizes :  {
      xs:7,
      s: 10,
      m:20,
      l:0,
      xl:9
    },
  },
  {
    model: "Adidas", 
    color: "white",
    sector: "T-Shirt",
    title: "OWN THE RUN TEE" ,
    price :21 ,
    img : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2eb52e833b644f099180ac8401169eb3_9366/Own_the_Run_Tee_White_GJ9989_21_model.jpg",
    sizes :  {
      xs:8,
      s: 5,
      m:5,
      l:12,
      xl:2
    },
  },
  {
    model: "Adidas", 
    color: "blue",
    sector: "T-Shirt",
    title: "ADICOLOR CLASSICS TRACEABLE TEE" ,
    price :21 ,
    img : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/201e9d76c1a74febb283adab0112ee4b_9366/Adicolor_Classics_Traceable_Tee_Blue_HC1963_21_model.jpg",
    sizes :  {
      xs:5,
      s: 0,
      m:6,
      l:8,
      xl:10
    },
  },
  {
    model: "Adidas", 
    color: "black",
    sector: "T-Shirt",
    title: "ADICOLOR ESSENTIALS RIB TANK TOP" ,
    price :20 ,
    img : "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7f7652bd04b74b46adcfada1012e64ab_9366/Adicolor_Essentials_Rib_Tank_Top_Black_HF3399_21_model.jpg",
    sizes :  {
      xs:8,
      s: 25,
      m:0,
      l:0,
      xl:4
    },
  }
]



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
          date_of_birth DATE NOT NULL,
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
    for(let pant of pants){
      if(pant.brand == "21MEN") pant.brand = "MEN";
      if(pant.brand == "FOREVER 21") pant.brand = "WOMEN"
      if(pant.brand == "FOREVER 21 GIRLS") pant.brand = "WOMEN"
      const pantInterface: cloth2 = {
        brand: pant.brand,
        sector:"pants",
        title: pant.title,
        price: pant.price,
        img: pant.thumb_image,
        variants: pant.variants,
        sizes: {
          32: Math.floor(Math.random()*50),
          34: Math.floor(Math.random()*50),
          36: Math.floor(Math.random()*50),
          38: Math.floor(Math.random()*50),
          40: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
          44: Math.floor(Math.random()*50),
        }
        }
        allClothes.push(pantInterface)
      }
      // console.log(allClothes)

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
    for(let jacket of jackets){
      if(jacket.brand == "21MEN") jacket.brand = "MEN";
      if(jacket.brand == "FOREVER 21") jacket.brand = "WOMEN"
      if(jacket.brand == "FOREVER 21 GIRLS") jacket.brand = "WOMEN"
      const jacketInterface: cloth2 = {
        brand: jacket.brand,
        sector:"jackets",
        title: jacket.title,
        price: jacket.price,
        img: jacket.thumb_image,
        variants: jacket.variants,
        sizes: {
          xs: Math.floor(Math.random()*50),
          s: Math.floor(Math.random()*50),
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
        }
        }
        allClothes.push(jacketInterface)
      }
      // console.log(allClothes)

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
    for(let shirt of shirts){
      if(shirt.brand == "21MEN") shirt.brand = "MEN";
      if(shirt.brand == "FOREVER 21") shirt.brand = "WOMEN"
      if(shirt.brand == "FOREVER 21 GIRLS") shirt.brand = "WOMEN"
      const shirtInterface: cloth2 = {
        brand: shirt.brand,
        sector:"T-Shirts",
        title: shirt.title,
        price: shirt.price,
        img: shirt.thumb_image,
        variants: shirt.variants,
        sizes: {
          xs: Math.floor(Math.random()*50),
          s: Math.floor(Math.random()*50),
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
        }
        }
        allClothes.push(shirtInterface)
      }
      // console.log(allClothes)

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
    for(let dress of dresses){
      if(dress.brand == "21MEN") dress.brand = "MEN";
      if(dress.brand == "FOREVER 21") dress.brand = "WOMEN"
      if(dress.brand == "FOREVER 21 GIRLS") dress.brand = "WOMEN"
      const dressInterface: cloth2 = {
        brand: dress.brand,
        sector:"dresses",
        title: dress.title,
        price: dress.price,
        img: dress.thumb_image,
        variants: dress.variants,
        sizes: {
          xs: Math.floor(Math.random()*50),
          s: Math.floor(Math.random()*50),
          m: Math.floor(Math.random()*50),
          l: Math.floor(Math.random()*50),
          xl: Math.floor(Math.random()*50),
        }
        }
        allClothes.push(dressInterface)
      }
      // console.log(allClothes)

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
      if(shoe.brand == "FOREVER 21") shoe.brand = "WOMEN"
      if(shoe.brand == "FOREVER 21 GIRLS") shoe.brand = "WOMEN"
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
      // console.log(allClothes)
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
    for(let jeans of jeanses){
      if(jeans.brand == "21MEN") jeans.brand = "MEN";
      if(jeans.brand == "FOREVER 21") jeans.brand = "WOMEN"
      if(jeans.brand == "FOREVER 21 GIRLS") jeans.brand = "WOMEN"
      const jeansInterface: cloth2 = {
        brand: jeans.brand,
        sector:"jeans",
        title: jeans.title,
        price: jeans.price,
        img: jeans.thumb_image,
        variants: jeans.variants,
        sizes: {
          32: Math.floor(Math.random()*50),
          34: Math.floor(Math.random()*50),
          36: Math.floor(Math.random()*50),
          38: Math.floor(Math.random()*50),
          40: Math.floor(Math.random()*50),
          42: Math.floor(Math.random()*50),
          44: Math.floor(Math.random()*50),
        }
        }
        allClothes.push(jeansInterface)
      }

  }).catch(function (error: any) {
    console.error(error);
  });
}
  

async function insertClothes(){
  await getPants();
  await getJackets();
  await getShirts();
  await getDresses();
  await getShoes();
  // await getJeanses();
  // for(let cloth of allClothes){
  //   const clothArray = Object.values(cloth);
  //   const sql = 'INSERT INTO clothes(brand ,sector ,title , price , img , variants, sizes ) VALUES($1, $2, $3, $4, $5, $6, $7 )';
  //   await client.query(sql, clothArray);
  // }
  // console.log('insert')
}

// insertClothes();