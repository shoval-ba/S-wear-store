import { Client } from 'pg';
import dotenv from 'dotenv';
const bcrypt = require('bcryptjs')
dotenv.config();

const DATABASE_URL = process.env.DATABASE_URL
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

//Get all the clothes.
export async function getClothes(){
  const sql = `SELECT * FROM clothes `;
  const result = await client.query(sql);
  const clothes = result.rows.map((cloth:any) => Object.assign(cloth));
  return clothes;
}

//Get cloth by id.
export async function getClothesByBrand(brand:string){
  const sql = `SELECT * FROM clothes WHERE brand=$1`;
  const result = await client.query(sql,[brand]);
  const clothes = result.rows.map((cloth:any) => Object.assign(cloth));
  return clothes;
}

export async function getMyBag(userId:string){
  const sql = `SELECT * FROM carts INNER JOIN clothes ON carts.user_id=$1 AND carts.cloth_id = clothes.cloth_id`;
  const result = await client.query(sql,[userId]);
  if(result.rows.length > 0){
    const array = await Promise.all(result.rows.map(async (cart: any) => {
      const sql = `SELECT * FROM clothes WHERE cloth_id=$1`;
      const result = await client.query(sql, [cart.cloth_id]);
      if(result.rows.length > 0){
        let newCart = {
          size: cart.size,
          quantity: cart.quantity,
          cloth: Object.assign(result.rows[0])
        };
        return newCart
      }
    }))
    return array
  }
  return []
}

export async function getMyFavorites(userId:string){
  const sql = `SELECT * FROM favorites INNER JOIN clothes ON favorites.user_id=$1 AND favorites.cloth_id = clothes.cloth_id`;
  const result = await client.query(sql,[userId]);
  if(result.rows.length > 0){
    const array = await Promise.all(result.rows.map(async (cart: any) => {
      const sql = `SELECT * FROM clothes WHERE cloth_id=$1`;
      const result = await client.query(sql, [cart.cloth_id]);
      if(result.rows.length > 0){
           return Object.assign(result.rows[0]);
      }
    }))
    return array
  }
  return []
}

// Add officer to users table.
export async function addToCarts(size:any , quantity:any , userId:number ,clothId:number){
  const sql1 =`DELETE FROM carts WHERE cloth_id=$1 AND user_id =$2 `
  await client.query(sql1 , [clothId , userId])
  const sql = 'INSERT INTO carts(size ,quantity ,user_id, cloth_id) VALUES($1, $2, $3, $4)';
  await client.query(sql, [size , quantity , userId , clothId]);
  return "Success"
}

// Add officer to users table.
export async function deleteCart(clothId:number){
  const sql1 =`DELETE FROM carts WHERE cloth_id=$1`
  await client.query(sql1 , [clothId])
  return "Success"
}

// Add officer to users table.
export async function deleteFavorite(clothId:number){
  const sql1 =`DELETE FROM favorites WHERE cloth_id=$1`
  await client.query(sql1 , [clothId])
  return "Success"
}

// Add officer to users table.
export async function addToFavorites(userId:number ,clothId:number){
  const sql = 'INSERT INTO favorites(user_id, cloth_id) VALUES($1, $2)';
  await client.query(sql, [userId , clothId]);
  return "Success"
}

// Add officer to users table.
export async function addToOrders(size:any , quantity:any , userId:number ,clothId:number){
  const sql = 'INSERT INTO orders(size ,quantity ,user_id, cloth_id) VALUES($1, $2, $3, $4)';
  await client.query(sql, [size , quantity , userId , clothId]);
  const sql1 = 'DELETE FROM carts WHERE user_id=$1';
  await client.query(sql1, [userId]);
  const sql2 = `SELECT sizes FROM clothes WHERE cloth_id = $1;`
  const result = await client.query(sql2, [clothId]);
  let sizes :any = result.rows[0].sizes
  console.log(clothId , sizes)
  const oldQuantity = sizes[size]
  sizes[size] = ( oldQuantity - quantity)
  console.log(clothId , sizes)
  const sql3 = `UPDATE clothes SET sizes = $1 WHERE cloth_id = $2`;
  await client.query(sql3 , [sizes , clothId])
  return "Your order is on the way , it will come until 10 days";
  // "Your order is good to go"
}

// Add officer to users table.
export async function addToUsers(user:any){
  const userArray = Object.values(user);
  const sql1 = 'SELECT COUNT(email) FROM users WHERE email = $1';
  let result = await client.query(sql1, [user.email]);
  if (result.rows[0].count >= 1) return "user with the same email already exist";
  const sql = 'INSERT INTO users(first_name ,last_name ,phone_number, city , adress , email, password) VALUES($1, $2, $3, $4, $5, $6, $7)';
  await client.query(sql, userArray);
  const sql2 = `SELECT * FROM users WHERE email=$1 AND password=$2`;
  const result2 = await client.query(sql2 , [user.email , user.password]);
  const user2 = result2.rows.map((user:any) => Object.assign(user));
  return user2[0]
}

//Get all the clothes.
export async function checkIfUserExist(email:string  , password:string){
  const sql = `SELECT * FROM users WHERE email=$1`;
  const result = await client.query(sql , [email]);
  const user = result.rows.map((user:any) => Object.assign(user));
  if(user.length == 1) {
    const doesPasswordMatch = bcrypt.compareSync(password, user[0].password);
    if(doesPasswordMatch) return user[0];
    else return "Invalid password"
  }
  else if(user.length == 0) return "Invalid email"
}