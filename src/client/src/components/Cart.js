import {React , useState , useEffect , createRef} from 'react';
import '../styles/Cart.scss'
import {  useOutletContext} from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart()  { 
   
    const myBag = useOutletContext().myBag;
    const setMyBag = useOutletContext().setMyBag;
    const currentUser = useOutletContext().currentUser
    const setSighIn = useOutletContext().setSighIn

    const [totalPrice , setTotalPrice]= useState(0);

    useEffect(() => {
        setTotalPrice(0)
        let total = 0
        for (let item of myBag){
            total += (item.cloth.price)*(item.quantity)
        }
        setTotalPrice(Math.floor(total))
    }, [myBag] );
    
    const handleDelete = async (item) => {
        setMyBag(previousState =>{ 
            const itemsFilter = previousState.filter(currentItem => { return item !== currentItem})
            return [...itemsFilter]
            })
        const options ={
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try{
            let result = await fetch(`/deleteCart${item.cloth.cloth_id}`, options);
            await result.json().then((res) => {
                console.log(res)
            })
        }
        catch {
            alert("no")
        }
    }

    const handlePay = async () => {
        if(currentUser === null) {
            setSighIn(true)
            return;
        }
        else if (myBag.length ===0 ) {
            alert('Your cart is empty')
            return;
        }
        else{
            console.log(currentUser)
            console.log(myBag)
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
                  }
                  catch {
                    alert("no")
                  }
            }
        }
    }

    const changeQuantity = (number , item ) => {
        if(item.quantity + number <= 0 ){
            handleDelete(item)
        }
        else if (number === 1 || number === -1){
            setMyBag(previousState =>{
                const itemsFilter = previousState.filter(currentItem => { return item !== currentItem })
                return [...itemsFilter , {...item, quantity:item.quantity+number}]
                })
            
        }
        else {
            setMyBag(previousState =>{ 
                const itemsFilter = previousState.filter(currentItem => { return item !== currentItem })
                return [...itemsFilter , {...item, quantity:number}]
                })
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
                        <div className="col-2"><img className="img-fluid" src={item.cloth.img}/></div>
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
                        <input className="inputCode" id="code" placeholder="Enter your code"/>
                    </form>
                    <div className="row" style={{borderTop: "1px solid rgba(0,0,0,.1)", padding: "2vh 0"}}>
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">{totalPrice + 5}$</div>
                    </div>
                    <button className="btn" onClick={()=>handlePay()}>PAYMENT</button>
                </div>
            </div>
            
        </div>
        </div>
    )
}
