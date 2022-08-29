import {React , useState , useEffect } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ClearIcon from '@mui/icons-material/Clear';

export default function OneCloth(props)  { 
    const cloth = props.cloth;
    const [chosenSize , setChosenSize] = useState()
    let sizes = [];

    for(let key in cloth.sizes){
        if(cloth.sizes[key] === 0) continue;
        else {
            sizes.push(key)
        }
    }

      const sizesUI = sizes.map(size=>{
        // if(cloth.sizes[size]==0) console.log(size)
        return(
            <div>
                <button className='button-17'>{size}</button>
            </div>
        )
      })

    const close = () => {
        props.close(false)
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
                    </div> 
                    <div className='add'>
                        <button className="button-31">Add to bag </button>
                        <div className='circle'>
                            <FavoriteBorderIcon id="favoriteIcon"/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}