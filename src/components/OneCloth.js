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
    let sizes = [];

    for(let key in cloth.sizes){
        sizes.push(key);
    }

      const sizesUI = sizes.map(size=>{
        if(cloth.sizes[size] == 0) {
            return (
                <div>
                    <button className='button-17' style={{color:"DarkGrey"}}>{size}</button>
                </div>
            )
        }
        else if(size === chosenSize){
            return(
                <div>
                    <button className='button-17' style={ {outline: "none" , border: "2px solid #4285f4"}} onClick={() => setChosenSize(size)}>{size}</button>
                </div>
            )
        }
        else{
            return(
                <div>
                    <button className='button-17' onClick={() => setChosenSize(size)}>{size}</button>
                </div>
            )
        }
      })

    const close = () => {
        props.close(false)
    }

    const addToBag = () =>{
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
        <div className='background' key={cloth.cloth_id}>
            <div className="oneCloth" key={cloth.cloth_id}>  
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
                        <AddIcon onClick={()=>setQuantity(quantity+1)}></AddIcon>
                        <input typy="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                        <RemoveIcon onClick={()=>setQuantity(quantity-1)}></RemoveIcon>
                    </div>
                    <div className='add'>
                        <button className="button-31" onClick={()=>addToBag()}>Add to bag </button>
                        <div className='circle'>
                            <FavoriteBorderIcon id="favoriteIcon"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}