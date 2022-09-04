import {React , useState , useEffect , createRef} from 'react';
import {  useOutletContext} from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../styles/OneCloth.scss';

export default function OneCloth(props)  { 
    const cloth = props.cloth;
    const [chosenSize , setChosenSize] = useState();
    const [quantity , setQuantity] = useState(0)
    const select = createRef();
    const setMyBag = useOutletContext().setMyBag;
    const myBag = useOutletContext().myBag;
    const setMyFavorite = useOutletContext().setMyFavorite;
    const myFavorite = useOutletContext().myFavorite;
    let sizes = [];
    const [colorHeart , setColor] = useState("black")

    for(let key in cloth.sizes){
        sizes.push(key);
    }

    useEffect(()=>{
        for(let favorite of myFavorite) {
            if(cloth.cloth_id == favorite.cloth_id) {
                setColor("red")
            }
        }
    } , [colorHeart])

    useEffect(()=>{
        if(quantity <= 0 ) setQuantity(1)
    } , [quantity])

      const sizesUI = sizes.map((size , index)=>{
        if(cloth.sizes[size] == 0) {
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

    const addToFavorite = () => {
        setColor("red")
        for(let favorite of myFavorite) {
            if(cloth.cloth_id == favorite.cloth_id) {
                setColor("black")
                setMyFavorite(previousState =>{ 
                    const itemsFilter = previousState.filter(currentItem => { return favorite.cloth_id !== currentItem.cloth_id })
                    return [...itemsFilter]
                })
                return;
            }
        }
        setMyFavorite(previousState =>{ return [...previousState , cloth]})
    }

    const addToBag = () =>{
        for(let cloth2 of myBag) {
            if(cloth.cloth_id == cloth2.cloth.cloth_id && cloth2.size == chosenSize) {
                let newCloth = {
                    cloth:cloth,
                    size:chosenSize, 
                    quantity:cloth2.quantity+quantity
                }
                setMyBag(previousState =>{ 
                    const itemsFilter = previousState.filter((currentItem)=>{return currentItem !== cloth2})
                    return [...itemsFilter , newCloth]
                    })
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
            setMyBag(previousState =>{ return [...previousState , newCloth]}); 
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
                        <h3>sizes:</h3>
                        <div className='sizes'>
                            {sizesUI}
                        </div>
                        <p ref={select} style={{display:"none" , color:"rgb(238, 85, 85)"}}>Please select your size</p>
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
                        <button className="button-31" onClick={()=>addToBag()}>Add to bag </button>
                        <div className='circle'>
                            <FavoriteBorderIcon id="favoriteIcon" style={{color:colorHeart}} onClick={()=>addToFavorite()}/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}