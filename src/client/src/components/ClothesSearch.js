import {React , useState , useEffect} from 'react';
import {  useOutletContext} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OneCloth from './OneCloth';
import Filters from './Filters';
import Sort from './Sort';
import '../styles/Clothes.scss';

export default function ClothSearch(props)  { 
    const [openOneCloth , setOpenOneCloth] = useState(false);
    const [oneCloth , setOneCloth] = useState({})
    const [clothesAfterSearch , setClothes] = useState([])
    const setMyFavorite = useOutletContext().setMyFavorite;
    const myFavorite = useOutletContext().myFavorite;
    const currentUser = useOutletContext().currentUser;
    const searchValue = useOutletContext().searchValue;
    const allClothes = useOutletContext().allClothes;

      useEffect(()=>{
        let clothesAfterSearch =[]
        if(searchValue === "")
        for (let cloth of allClothes){
          if(cloth.title.toLowerCase().includes(searchValue)){
            console.log(cloth.title)
            clothesAfterSearch.push(cloth)
          }
        }
        setClothes(clothesAfterSearch)
        console.log(clothesAfterSearch)
      } , [searchValue])

      const handleClick = (cloth) => {
        setOneCloth(cloth)
        setOpenOneCloth(true)
      }

      const addToFavorite = async (event , cloth) => {
        event.target.style.color = "red"
        for(let favorite of myFavorite) {
            if(cloth.cloth_id == favorite.cloth_id) {
              event.target.style.color = "black"
                setMyFavorite(previousState =>{ 
                    const itemsFilter = previousState.filter(currentItem => { return favorite.cloth_id !== currentItem.cloth_id })
                    return [...itemsFilter]
                })
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
            setMyFavorite(previousState =>{ return [...previousState , cloth]})
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
      const clothesUi = clothesAfterSearch.map(cloth => {
        let colorHeart
        for(let favorite of myFavorite) {
          if(cloth.cloth_id == favorite.cloth_id) {
            colorHeart = "red"
          }
        }
        return (
            <div className='item' key={cloth.cloth_id}>
            <div className="backgroundImg">
                    <FavoriteIcon id="favorite" style={{color:colorHeart}} onClick={(event)=>addToFavorite(event , cloth)}/>
                    <img className ='img' src={cloth.img} alt="clothImg" onClick={()=>handleClick(cloth)}/> 
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
      <div style={{margin:"20px"}}>
      <div className='filterAnd'>
          <div id='container'>
            {clothesUi}
            {openOneCloth ? <OneCloth cloth={oneCloth} close={setOpenOneCloth}/> : <></>}
          </div>
        </div>
        </div>
    )
}
 