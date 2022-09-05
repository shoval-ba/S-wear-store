import {React , useState , useEffect , useOutletContext} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OneCloth from './OneCloth';
import Filters from './Filters';
import Sort from './Sort';
import '../styles/Clothes.scss';

export default function Cloth(props)  { 
  const brand = props.brand;

    const [clothes , setClothes] = useState([]);
    const [clothesAfterFilter , setClothesFilter] = useState([]);
    const [openOneCloth , setOpenOneCloth] = useState(false);
    const [oneCloth , setOneCloth] = useState({})

    const getClothes = () => {
        fetch(`/clothesByBrand${brand}`)
        .then((res) => res.json())
        .then((response) => {
          setClothes(response)
          setClothesFilter(response)
        })
      }
    
      useEffect(() => {
        getClothes();
      }, [brand] );

      const handleClick = (cloth) => {
        setOneCloth(cloth)
        setOpenOneCloth(true)
      }

      const clothesUi = clothesAfterFilter.map(cloth => {
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
                        <button className="buttonAdd" onClick={()=>handleClick(cloth)}>Add to cart</button>
                    </div>
                </div>
            </div>
        )
      })

    return (
      <div>
          <Sort clothes={clothesAfterFilter} setClothes={setClothesFilter}></Sort>
      <div className='filterAnd'>
            <Filters brand={brand} clothes={clothes} setClothes={setClothesFilter}/>
          <div id='container'>
            {clothesUi}
            {openOneCloth ? <OneCloth cloth={oneCloth} close={setOpenOneCloth}/> : <></>}
          </div>
        </div>
        </div>
    )
}
 