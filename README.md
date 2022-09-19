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

## My way 

Right at the very beginning of this project I encounter a problem regarding the data gathering as well as organizing it as a table in the data- base. Moreover, during my search for an applicable API, I struggled to find suitable relevant information. After searching, I was able to find a suitable API and took the clothes from the API, I stored them on the data- base and added the quantity as well as the sizes for each product.
The next phase was to think how I want to present the products on the website so it will be as easy as possible for the user to find what he wants and place an order. I draw a lot of inspiration from successful existing clothes websites and used "Bootstrap" method to design it and enhance the UX which was always a big priority to me throughout the project.
After the website front was ready, I tried to find the best way to save the customers data including the orders, Wishlist and log-In detail. At first, I saved this data in the Front end, however this solution was not idle, so I started building relevant tables and save the user’s data in the database. This way I could present the customer’s data to him when he logs in to the website. The customer can get a full picture of his last purchases, the items he loved and more.

