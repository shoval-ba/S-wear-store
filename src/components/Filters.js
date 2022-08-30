import {React , useState , useEffect , createRef} from 'react';
import "../styles/Filters.scss"

export default function Filters(props)  { 

    const brand = props.brand;
    const [chosenSector , setSector] = useState();

    const filterBySector=(sector)=>{
        setSector(sector);
        
    }

    if(brand === "WOMEN"){
        return (
            <div className='container'>
                <div className='filter' onClick={()=>filterBySector("T-shirt")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("Pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("Shoes")}>
                    <h6>Shoes</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("jackets")}>
                    <h6>Jackets</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("dresses")}>
                    <h6>Dresses</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("Socks")}>
                    <h6>Socks</h6>
                </div>
            </div>
        )
    }
    else if(brand === "MEN"){
        return (
            <div className='container' style={{height:"250px"}}>
                <div className='filter' onClick={()=>filterBySector("T-shirt")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("Pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("Shoes")}>
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
                <div className='filter' onClick={()=>filterBySector("T-shirt")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={()=>filterBySector("Pants")}>
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