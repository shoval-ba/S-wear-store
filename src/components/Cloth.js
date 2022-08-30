import {React , useState , useEffect , useOutletContext} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OneCloth from './OneCloth';
import Filters from './Filters';
import '../styles/Clothes.scss';

export default function Cloth(props)  { 
  const brand = props.brand;

    const [clothes , setClothes] = useState([]);
    const [openOneCloth , setOpenOneCloth] = useState(false);
    const [oneCloth , setOneCloth] = useState({})

    const getClothes = () => {
        fetch(`https://clothes-app-shoval.herokuapp.com/clothesByBrand${brand}`)
        .then((res) => res.json())
        .then((response) => setClothes(response))
      }
    
      useEffect(() => {
        getClothes();
        console.log(clothes)
      }, [brand] );

      const handleClick = (cloth) => {
        setOneCloth(cloth)
        setOpenOneCloth(true)
      }

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
                        <h1 className="model"> {cloth.sector}</h1> 
                        <button className="buttonAdd" onClick={()=>handleClick(cloth)}>Add to bag </button>
                    </div>
                </div>
            </div>
        )
      })

    return (
      <div>
       
      <div className='filterAnd'>
            <Filters brand={brand}/>
          <div id='container'>
            {clothesUi}
            {openOneCloth ? <OneCloth cloth={oneCloth} close={setOpenOneCloth}/> : <></>}
          </div>
        </div>
        </div>
    )
}
 