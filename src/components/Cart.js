import {React , useState , useEffect , createRef} from 'react';
import '../styles/Cart.scss'
import {  useOutletContext} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart()  { 
   
    const myBag = useOutletContext().myBag;

    const [totalPrice , setTotalPrice]= useState(0);
    const [items , setItems] = useState(myBag);

    useEffect(() => {
        setTotalPrice(0)
        let total = 0
        for (let item of items){
            total += (item.cloth.price)*(item.quantity)
        }
        setTotalPrice(Math.floor(total))
    }, [items] );
    
    let itemsUi ;
    if(items.length ===0 ){
        itemsUi = (
            <div style={{textAlign:"center"}}>                  
                <img id="emptyImg" src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart"/>
                <h2>Your cart is empty!</h2>                           
            </div>   
        )
    }

    else {
        itemsUi = items.map(item => {
            return (
                 <div className="row border-top border-bottom">
                    <div className="row main align-items-center">
                        <div className="col-2"><img className="img-fluid" src={item.cloth.img}/></div>
                        <div className="col">
                            <div className="row text-muted">{item.cloth.sector}</div>
                            <div className="row">{item.cloth.title}</div>
                        </div>
                        <div className="col">
                        <AddIcon onClick={()=>setItems(previousState =>{ 
                            const itemsFilter = previousState.filter(currentItem => { return item.cloth.cloth_id !== currentItem.cloth.cloth_id })
                            return [...itemsFilter , {...item, quantity:item.quantity+1}]
                            })}></AddIcon>
                        <input typy="number" value={item.quantity} onChange={(e)=>setItems(e.target.value)}/>
                        <RemoveIcon onClick={()=>setItems(previousState =>{ 
                            const itemsFilter = previousState.filter(currentItem => { return item.cloth.cloth_id !== currentItem.cloth.cloth_id })
                            return [...itemsFilter , {...item, quantity:item.quantity-1}]
                            })}></RemoveIcon>
                        </div>
                        <div className="col">{item.cloth.price} $<span className="close" onClick={()=>{handleDelete(item)}}>&#10005;</span></div>
                    </div>
                </div> 
            )
        })
    }
    return (
        <div>
           <div className="card">
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
                        <input id="code" placeholder="Enter your code"/>
                    </form>
                    <div className="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">{totalPrice + 5}$</div>
                    </div>
                    <button className="btn">TO PAY</button>
                </div>
            </div>
            
        </div>
        </div>
    )
}
// export default function Cart()  { 
   
//    const myBag = useOutletContext().myBag;
//     {console.log(myBag)}
//     return (
//         <div className='cart-preview active'>
//            <div id='info'>
//                 <div id='insideInfo'>
//                     <div className='empty-cart'>
//                         <img src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart"/>
//                         <h2>Your cart is empty!</h2>
//                     </div>
//                 </div>
//                 <div className='action-block'>
//                     <button type="button" class="disabled">PROCEED TO CHECKOUT</button>
//                 </div>
//            </div>
//         </div>
//     )
// }