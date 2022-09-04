import {React , useState , useEffect , createRef} from 'react';
import "../styles/Filters.scss"

export default function Filters(props)  { 

    const brand = props.brand;
    const clothes = props.clothes;
    let clothesAfterFilter = []
    const [chosenSector , setSector] = useState();
    // const [clothesAfterFilter , setClothes] = useState([]);

    const filterBySector=(sector)=>{
        setSector(sector);
        console.log(sector)
        console.log(clothes)
        for(let cloth of clothes){
            if(cloth.sector == sector) {
                clothesAfterFilter.push(cloth)
            }
        }
        props.setClothes(clothesAfterFilter)
    }

    if(brand === "WOMEN"){
        return (
            <div className='container'>
                <div className='filter' onClick={()=>filterBySector("T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("shoes")}>
                    <h6>Shoes</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("jackets")}>
                    <h6>Jackets</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("dresses")}>
                    <h6>Dresses</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("socks")}>
                    <h6>Socks</h6>
                </div>
            </div>
        )
    }
    else if(brand === "MEN"){
        return (
            <div className='container' style={{height:"250px"}}>
                <div className='filter' onClick={()=>filterBySector("T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("shoes")}>
                    <h6>Shoes</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("jackets")}>
                    <h6>Jackets</h6>
                </div>
            </div>
        )
    }
    else if(brand === "PLUS"){
        return (
            <div className='container' style={{height:"250px"}}>
                <div className='filter' onClick={()=>filterBySector("T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("dresses")}>
                    <h6>Dresses</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("jackets")}>
                    <h6>Jackets</h6>
                </div>
            </div>
        )
    }
}