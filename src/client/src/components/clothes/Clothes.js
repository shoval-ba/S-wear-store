import { React, useState, useEffect, createRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OneCloth from './OneCloth';
import Filters from './Filters';
import Sort from './Sort';
import '../../styles/Clothes.moudle.scss';
import { useSelector, useDispatch } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../slices/myFavoritesSlice';

export default function Cloth(props) {
  const brand = props.brand;

  const myFavorites = useSelector((state) => state.myFavorites.myFavorites);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [clothes, setClothes] = useState([]);
  const [clothesAfterFilter, setClothesFilter] = useState([]);
  const [openOneCloth, setOpenOneCloth] = useState(false);
  const [oneCloth, setOneCloth] = useState({});
  const [sector, setSector] = useState("");
  const searchValue = useOutletContext().searchValue;

  const message = createRef();

  // Gets all clothes by brand.
  useEffect(() => {
    const getClothes = () => {
      fetch(`/clothesByBrand${brand}`)
        .then((res) => res.json())
        .then((response) => {
          setClothes(response);
          setClothesFilter(response);
        })
    }
    getClothes();
  }, [brand]);

  // Gives the clothes after search.
  useEffect(() => {
    let clothesAfterSearch = [];
    if (searchValue === undefined || searchValue === "") {
      setClothesFilter(clothes);
      setClothes(clothes);
    } else {
      for (let cloth of clothes) {
        if (cloth.title.toLowerCase().includes(searchValue)) {
          clothesAfterSearch.push(cloth);
        }
      }
      setClothesFilter(clothesAfterSearch);
      if (clothesAfterSearch.length === 0) {
        message.current.style.display = "block";
      } else message.current.style.display = "none";
    }
  }, [searchValue])

  // Open one cloth.
  const handleClick = (cloth) => {
    setOneCloth(cloth);
    setOpenOneCloth(true);
  }

  // Add cloth to the favorites.
  const addToFavorite = async (event, cloth) => {
    event.target.style.color = "red";
    for (let favorite of myFavorites) {
      if (cloth.cloth_id === favorite.cloth_id) {
        event.target.style.color = "black";
        dispatch(removeFromFavorites(cloth));
        if (currentUser !== null) {
          const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: currentUser.user_id, clothId:cloth.cloth_id })
          }
          try {
            let result = await fetch(`/deleteFavorite`, options);
            await result.json();
          }
          catch {
            alert("no");
          }
        }
        return;
      }
    }
    dispatch(addToFavorites(cloth));
    if (currentUser !== null) {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ clothId: cloth.cloth_id, userId: currentUser.user_id })
      }
      try {
        let result = await fetch('/addToFavorites', options);
        await result.json();
      }
      catch {
        console.log("no");
      }
    }
  }

  let clothesUi;
  useEffect(() => {
    let clothes = clothesAfterFilter;
    setClothesFilter(clothes);
  }, [myFavorites])

  if (clothesAfterFilter.length > 0) {
    clothesUi = clothesAfterFilter.map(cloth => {
      let colorHeart;
      for (let favorite of myFavorites) {
        if (cloth.cloth_id === favorite.cloth_id) {
          colorHeart = "red";
        } else {
          colorHeart = "black";
        }
      }
      return (
        <div className='item' key={cloth.cloth_id}>
          <div className="backgroundImg">
            <FavoriteIcon id="favorite" style={{ color: colorHeart }} onClick={(event) => addToFavorite(event, cloth)} />
            <img className='img' src={cloth.img} alt="clothImg" onClick={() => handleClick(cloth)} />
            <h3 className="price" > {cloth.price} $ </h3>
          </div>
          <div className="bottom">
            <div className='info'>
              <h1 className="title"> {cloth.title}</h1>
              <h1 className="model"> {cloth.sector}</h1>
              <button className="buttonAdd" onClick={() => handleClick(cloth)}>Add to cart</button>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <div style={{ margin: "20px" }}>
      <Sort clothes={clothesAfterFilter} setClothes={setClothesFilter} sector={sector}></Sort>
      <div className='filterAnd'>
        <Filters brand={brand} clothes={clothes} setClothes={setClothesFilter} setSector={setSector} />
        <div id='container'>
          {clothesUi}
          <h1 ref={message} style={{ display: "none", color: "DarkBlue" }}>Sorry, we don't have the items you're looking for.</h1>
        </div>
      </div>
      {openOneCloth ? <OneCloth cloth={oneCloth} close={setOpenOneCloth} /> : <></>}
    </div>
  )
}
