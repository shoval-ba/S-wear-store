# S-wear-store

A clothing store for women :dress: men :necktie: kids :shirt: and plus size :womans_clothes:. 

Click [Here](https://s-wear-store.herokuapp.com/) to choose your stylish look today. :point_left:

## Why I choose this specific project?

Online shopping became extremely popular in the last decade and especially in the last 2 years since Covid-19 emerge and changed our shopping habits.
Nowadays, everyone can easily order anything online so I decided to make a fashionable clothing website that is convenient for the customer to see all the offered products with different sizes and quantities to choose from and easily make an order.
As for the technical part, as part of building the website, I stored all the offered products in a Database as well as the user’s info, including their cart, whishing list and previous orders. :briefcase:

## Technology
#### Client side :
 The client side is written in React.
 I chose "React" because it's rendered to the screen on every change of the state, like when you add clothes to your cart or when you login or order things.
 
 #### Server side :
The server side is written in TypeScript and compiled into JS through a gulp file.
 
 #### Database :
 The database is stored in PostgreSql.
 I chose this database becaucse I wanted to store my data in tables. I also use foreign key in my database and I don't just save objects.
 
 ## How to run the project?
 1. git clone
 2. npm ci
 3. In one terminal run :'npm run server'
 4. In other terminal run : 'npm run start'

## The path I took during the project
During the project I got stuck with a lot of bugs or some featurs that I like to add but don't know how.
At the begging of the project, I thout how to get my clothes like how I want them organized, with the attribute of every cloth and all the sizes and there quantity.
I searched for a long time for good api until I find somthing that it is almost perfect for me. Then I took the clothes from the api and created fro, them the data of the clothes like how I wanted that they be.
After I got my clothes like I wanted, I ask myself another question how to save the users, their cart, their favorites and also their orders if they order.
I decided to save all at the front and then I decided to save that also in the database. When the user connect to my web, his cart and his whishing list and previous orders is in his web.



