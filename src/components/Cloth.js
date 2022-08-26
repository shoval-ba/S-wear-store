import {React , useState , useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Cloth()  { 

    const [clothes , setClothes] = useState([]);

    const getClothes = () => {
        fetch("https://clothes-app-shoval.herokuapp.com/allClothes")
        .then((res) => res.json())
        .then((response) => setClothes(response))
      }
    
      useEffect(() => {
        getClothes();
      }, [] );

      const clothesUi = clothes.map(cloth => {
        return (
            <div className='item' key={cloth.cloth_id}>
            <div className="backgroundImg">
                    <FavoriteIcon id="favorite"/>
                    <img className ='img' src={cloth.img} alt="clothImg"/> 
                    <h3 className="price" > {cloth.price} $ </h3>
                </div>
                <div className="bottom">
                    <div className='info'>
                        <h1 className="title"> {cloth.title}</h1>
                        <h1 className="model"> {cloth.model}</h1> 
                        <button className="buttonAdd">Add to bag </button>
                    </div>
                </div>
            </div>
        )
      })

    return (
        <div id='container'>
          {clothesUi}
        </div>
    )
}
 