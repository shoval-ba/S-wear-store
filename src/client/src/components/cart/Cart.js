import {React , useState , useEffect } from 'react';
import {  useOutletContext } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../../styles/Cart.scss';
import { removeFromBag , editItem , initBag} from '../../slices/myBagSlice'
import { changeSignIn } from '../../slices/signInSlice'

export default function Cart()  { 
    
    const myBag = useSelector((state) => state.myBag.myBag);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const setHaveOrders = useOutletContext().setHaveOrders;

    const [totalPrice , setTotalPrice]= useState(0);
    const [price , setPrice]= useState(5);

    // Change the total price.
    useEffect(() => {
        setTotalPrice(0)
        let total = 0
        for (let item of myBag){
            total += (item.cloth.price)*(item.quantity)
        }
        setTotalPrice(Math.floor(total))
    }, [myBag] );

    // Delete item from the bag 
    const handleDelete = async (item) => {
        console.log(item)
        const options ={
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({size:item.size ,  clothId:item.cloth.cloth_id , userId:currentUser.user_id})
          }
          try{
            let result = await fetch('/deleteCart', options);
            await result.json()
          }
          catch {
            console.log("no")
          }
        dispatch(removeFromBag(item))
    }

    // Enter a coupon code
    const inputCoupon = (value) =>{
        if(value === "Ilovecode" || value === "Swear5"){
            setPrice(0)
        } else setPrice(5)       
    }

    // Click the payment.
    const handlePay = async () => {
        if (myBag.length ===0 ) {
            alert('Your cart is empty')
            return;
        }
        else if(currentUser === null || currentUser === undefined) {
            dispatch(changeSignIn(true))
            console.log(myBag)
            return;
        }
        else{
            for(let item of myBag){
                const options ={
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({size:item.size , quantity:item.quantity ,userId:currentUser.user_id , clothId:item.cloth.cloth_id})
                  }
                  try{
                    let result = await fetch('/addToOrders', options);
                    await result.json().then((res) => {
                        console.log(res)
                    })
                    setHaveOrders(true)
                    dispatch(initBag([]))
                  }
                  catch {
                    console.log("Sorry we have a problem right now , Please try latter")
                  }
            }
        }
    }

    // Cahnge the quantity of the item.
    const changeQuantity = (number , item ) => {
        if(item.quantity + number <= 0 ){
            handleDelete(item)
        }
        else {
            dispatch(editItem({item , number}))     
        }
    }

    let itemsUi ;
    if(myBag.length ===0 ){
        itemsUi = (
            <div style={{textAlign:"center"}}>                  
                <img id="emptyImg" src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart"/>
                <h2>Your cart is empty!</h2>                           
            </div>   
        )
    }

    else {
        itemsUi = myBag.map((item,index) => {
            return (
                 <div className="row border-top border-bottom" key={item.cloth.cloth_id * index}>
                    <div className="row main align-items-center">
                        <div className="col-2"><img className="img-fluid" src={item.cloth.img} alt="clothImg"/></div>
                        <div className="col">
                            <div className="row text-muted">{item.cloth.sector}</div>
                            <div className="row">{item.cloth.title}</div>
                        </div>
                        <div className="col quantity">
                        <ul>
                            <li className="qty-opt left disabled">
                                <AddIcon onClick={()=>changeQuantity(1 , item)}></AddIcon>
                            </li> 
                            <li className="middle">
                                <input className="inputQuantity"  type="number" value={item.quantity} onChange={(e)=>changeQuantity(e.target.value , item)}/>
                            </li> 
                            <li role="button" className="qty-opt right">
                                <RemoveIcon onClick={()=>changeQuantity(-1 , item)}></RemoveIcon>
                            </li>
                        </ul>
                        </div>
                        <div className="col" style={{marginTop:"10px"}}>{item.cloth.price} $
                            <h6>size: {item.size}</h6>
                        </div>
                            <span className="close" onClick={()=>handleDelete(item)}>&#10005;</span>
                    </div>
                </div> 
            )
        })
    }
    return (
           <div className="card1">
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">{myBag.length}</div>
                        </div>
                    </div>    
                    {itemsUi} 
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr/>
                    <div className="row">
                        <div className="col" style={{paddingeft:0}}>{myBag.length}</div>
                        <div className="col text-right">{totalPrice}$</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- 5.00$</option></select>
                        <p>GIVE CODE</p>
                        <input className="inputCode" id="code" placeholder="Enter your code" onChange={(e)=>inputCoupon(e.target.value)}/>
                    </form>
                    <div className="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">{totalPrice + price}$</div>
                    </div>
                    <button className="btn" onClick={()=>handlePay()}>PAYMENT</button>
                </div>
            </div>        
        </div>
    )
}
