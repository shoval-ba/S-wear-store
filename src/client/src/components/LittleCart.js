import {React , useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import "../styles/LittleCart.scss"

export default function Sort(props)  { 

        const myBag = props.myBag;
        const [totalPrice , setTotalPrice]= useState(0);

        useEffect(() => {
                setTotalPrice(0)
                let total = 0
                for (let item of myBag){
                    total += (item.cloth.price)*(item.quantity)
                }
                setTotalPrice(Math.floor(total))
            }, [myBag] );

        let itemsUi ;
        if(myBag.length ===0 ){
            itemsUi = (
                <div id="emptyImgText">                  
                    <img id="img-empty" src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart"/>
                    <h6>Your cart is empty!</h6>                           
                </div>   
            )
        }
    
    
        else {
            itemsUi = myBag.map((item) => {
                return (
                        <li className="clearfix" key={item.cloth_id}>
                        <img src={item.cloth.img} alt="item1" />
                        <span className="item-name">{item.cloth.title}</span>
                        <span className="item-price">{item.cloth.price}$</span>
                        <span className="item-quantity">{item.quantity}</span>
                        </li>
                )
            })
        }

    return(
            <div onMouseLeave={() => props.setHover(false)}>
            <div className="shopping-cart">
            <div className="shopping-cart-header">
            <i className="fa fa-shopping-cart cart-icon"></i><span className="badge">{myBag.length}</span>
            <div className="shopping-cart-total">
            <span className="lighter-text">Total:</span>
            <span className="main-color-text">{totalPrice}$</span>
            </div>
            </div>

            <ul className="shopping-cart-items">
            {itemsUi}
            </ul>

            <Link to="cart" className="button">Checkout</Link>
            </div> 
        </div>
        
    )
 }
