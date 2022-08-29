import {React , useState , useEffect , createRef} from 'react';
import "../styles/Filters.scss"

export default function Filters()  { 

    const [chosenSector , setSector] = useState();

    const filterBySector=(sector)=>{
        setSector(sector);
        
    }

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
            <div className='filter' onClick={()=>filterBySector("Accessorise")}>
                <h6>Accessorise</h6>
            </div>
            <div className='filter' onClick={()=>filterBySector("Sports bras")}>
                <h6>Sports bras</h6>
            </div>
            <div className='filter' onClick={()=>filterBySector("Socks")}>
                <h6>Socks</h6>
            </div>
        </div>
    )
}