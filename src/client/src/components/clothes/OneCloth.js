import {React , useState , useEffect , createRef} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../../styles/OneCloth.scss';
import { addToBag , removeFromBag } from '../../slices/myBagSlice'
import { addToFavorites , removeFromFavorites } from '../../slices/myFavoritesSlice'

export default function OneCloth(props)  { 

    const myBag = useSelector((state) => state.myBag.myBag);
    const myFavorites = useSelector((state) => state.myFavorites.myFavorites);
    const currentUser = useSelector((state) => state.user.currentUser);
    const dispatch = useDispatch();

    const cloth = props.cloth;
    const [chosenSize , setChosenSize] = useState();
    const [quantity , setQuantity] = useState(0);
    const select = createRef();
    const [colorHeart , setColor] = useState("black");
    let sizes = [];

    for(let key in cloth.sizes){
        sizes.push(key);
    }

    useEffect(()=>{
        for(let favorite of myFavorites) {
            if(cloth.cloth_id === favorite.cloth_id) {
                setColor("red")
            }
        }
    } , [colorHeart])

    useEffect(()=>{
        if(quantity <= 0 ) setQuantity(1)
    } , [quantity])

      const sizesUI = sizes.map((size , index)=>{
        if(cloth.sizes[size] === 0) {
            return (
                <div key={cloth.cloth_id+index}>
                    <button className='button-17'style={{color:"DarkGrey"}}>{size}</button>
                </div>
            )
        }
        else if(size === chosenSize){
            return(
                <div key={cloth.cloth_id+index}>
                    <button className='button-17' style={ {outline: "none" , border: "2px solid #4285f4"}} onClick={() => setChosenSize(size)}>{size}</button>
                </div>
            )
        }
        else{
            return(
                <div key={cloth.cloth_id+index}>
                    <button className='button-17' onClick={() => setChosenSize(size)}>{size}</button>
                </div>
            )
        }
      })

    const close = () => {
        props.close(false)
    }

    // Add cloth to favorties.
    const addToFavorite = async () => {
        setColor("red")
        for(let favorite of myFavorites) {
            if(cloth.cloth_id === favorite.cloth_id) {
                setColor("black")
                dispatch(removeFromFavorites(cloth))
                if(currentUser !== null){
                    const options ={
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                    try{
                        let result = await fetch(`/deleteFavorite${favorite.cloth_id}`, options);
                        await result.json().then((res) => {
                            console.log(res)
                        })
                    }
                    catch {
                        alert("no")
                    }
                }
                return;
            }
        }
        dispatch(addToFavorites(cloth))
        if(currentUser !== null){
            const options ={
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ clothId:cloth.cloth_id , userId:currentUser.user_id})
              }
              try{
                let result = await fetch('/addToFavorites', options);
                await result.json().then((res) => {
                    console.log(res)
                })
              }
              catch {
                console.log("no")
              }
        }
    }

    // Add cloth to the bag.
    const addCloth = () =>{
        for(let cloth2 of myBag) {
            if(cloth.cloth_id === cloth2.cloth.cloth_id && cloth2.size === chosenSize) {
                let newCloth = {
                    cloth:cloth,
                    size:chosenSize, 
                    quantity:cloth2.quantity+quantity
                }
                dispatch(removeFromBag(cloth2))
                dispatch(addToBag(newCloth))
                return;
            }
        }
        if(chosenSize === undefined){
            select.current.style.display = "block";
        } else {
            let newCloth
            if(quantity <= 0 ) {
                setQuantity(1)
                newCloth = {
                    cloth:cloth,
                    size:chosenSize, 
                    quantity:1
                }
            } else{
                newCloth = {
                    cloth:cloth,
                    size:chosenSize, 
                    quantity:quantity
                }
            }
            select.current.style.display = "none";
            dispatch(addToBag(newCloth))
        }
    }

    return (
        <div className='background'>
            <div className="oneCloth">  
                <ClearIcon id="close" onClick={()=>close()}/>
                <div className='imageSide'>
                    <img className ='OneImage' src={cloth.img} alt="clothImg"/> 
                </div>   
                <div className='infoSide'>
                    <div className='firstDiv'>
                        <h1 className="clothTitle"> {cloth.title}</h1>
                        <h1 className="model"> {cloth.model}</h1> 
                        <h3 className="price" > {cloth.price} $ </h3>
                    </div>     
                    <div>
                        <h3 id="sizesTitle">sizes:</h3>
                        <div className='sizes'>
                            {sizesUI}
                        </div>
                        <p ref={select} className="errorMessage">Please select your size</p>
                    </div> 
                    
                    <div className='quantity'>
                        <ul>
                            <li className="qty-opt left disabled">
                                <AddIcon onClick={()=>setQuantity(quantity+1)}></AddIcon>
                            </li> 
                            <li className="middle">
                                <input className="inputQuantity"  type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                            </li> 
                            <li role="button" className="qty-opt right">
                                <RemoveIcon onClick={()=>setQuantity(quantity-1)}></RemoveIcon>
                            </li>
                        </ul>
                    </div>
                    <div className='add'>
                        <button className="button-31" onClick={()=>addCloth()}>Add to bag </button>
                        <div className='circle'>
                            <FavoriteBorderIcon id="favoriteIcon" style={{color:colorHeart}} onClick={()=>addToFavorite()}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}