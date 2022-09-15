import {React } from 'react';
import "../../styles/Filters.scss"

export default function Filters(props)  { 

    const brand = props.brand;
    const clothes = props.clothes;
    let clothesAfterFilter = [];

    const filterBySector=(event,sector)=>{
        const allDivs = document.querySelectorAll('.filter');
        for(let div of allDivs){
            div.style.backgroundColor="white";
        }
        if(event.target.tagName === "H6"){
            event.target.parentNode.style.backgroundColor = "rgb(209 209 209)"
        } else if (event.target.tagName === "DIV"){
            event.target.style.backgroundColor = "rgb(209 209 209)"
        }
        for(let cloth of clothes){
            if(cloth.sector === sector) {
                clothesAfterFilter.push(cloth);
            }
        }
        props.setClothes(clothesAfterFilter);
    }

    if(brand === "WOMEN"){
        return (
            <div className='containerFilter'>
                <div className='filter' onClick={(event)=>filterBySector(event,"T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"shoes")}>
                    <h6>Shoes</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"jackets")}>
                    <h6>Jackets</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"dresses")}>
                    <h6>Dresses and Suits</h6>
                </div>
            </div>
        )
    }
    else if(brand === "MEN"){
        return (
            <div className='containerFilter' style={{height:"243px"}}>
                <div className='filter' onClick={(event)=>filterBySector(event,"T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"shoes")}>
                    <h6>Shoes</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"jackets")}>
                    <h6>Jackets</h6>
                </div>
            </div>
        )
    }
    else if(brand === "PLUS"){
        return (
            <div className='containerFilter' style={{height:"243px"}}>
                <div className='filter' onClick={(event)=>filterBySector(event,"T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"dresses")}>
                    <h6>Dresses</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"jackets")}>
                    <h6>Jackets</h6>
                </div>
            </div>
        )
    }

    else if(brand === "KIDS"){
        return (
            <div className='containerFilter' style={{height:"243px"}}>
                <div className='filter' onClick={(event)=>filterBySector(event,"T-Shirts")}>
                    <h6>T-shirt</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"pants")}>
                    <h6>Pants</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"dresses")}>
                    <h6>Dresses</h6>
                </div>
                <div className='filter' onClick={(event)=>filterBySector(event,"jackets")}>
                    <h6>Jackets</h6>
                </div>
            </div>
        )
    }
}