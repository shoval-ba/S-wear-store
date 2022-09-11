import {React , useEffect, useState} from 'react';
import "../../styles/Sort.scss"

export default function Sort(props)  { 

    const clothes = props.clothes;
    let sorted= [];

    const handleClick = (value) => {
        console.log(value)
        if (value == "lowToHigh"){      
            sorted = clothes.slice().sort((a, b) => {
                return a.price - b.price;
            });
            props.setClothes(sorted)
        }
        if (value == "highToLow"){      
            sorted = clothes.slice().sort((a, b) => {
                return a.price - b.price;
            });
            sorted.reverse()
            props.setClothes(sorted)
        }
        if(value == "popular"){     
            sorted = clothes.slice().sort((a, b) => {
                return 0.5 - Math.random()
            });
            props.setClothes(sorted)
        }
    }

    return(
        <div id='sort'>
            <label htmlFor="sorts" id='sortTitle'>Sort by:</label>
            <select id="options" onClick={(e)=>handleClick(e.target.value)}>
                <option className="link" value="popular">popular</option>
                <option className="link" value="lowToHigh">Price low to high</option>
                <option className="link" value="highToLow">Price high to low</option>
            </select>
        </div>
    )
 }
