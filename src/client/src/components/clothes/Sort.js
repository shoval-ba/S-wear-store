import { React } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../styles/Sort.scss"

export default function Sort(props)  { 

    const clothes = props.clothes;
    let sorted= [];

    const handleChange = (value) => {
        console.log(value)
        if (value === "lowToHigh"){      
            sorted = clothes.slice().sort((a, b) => {
                return a.price - b.price;
            });
            props.setClothes(sorted)
        }
        if (value === "highToLow"){      
            sorted = clothes.slice().sort((a, b) => {
                return a.price - b.price;
            });
            sorted.reverse()
            props.setClothes(sorted)
        }
        if(value === "popular"){     
            sorted = clothes.slice().sort((a, b) => {
                return 0.5 - Math.random()
            });
            props.setClothes(sorted)
        }
    }

    return(
        <div id='sort'>
            {/* <label htmlFor="sorts" id='sortTitle'>Sort by:</label>
            <select id="options" onClick={(e)=>handleClick(e.target.value)}>
                <option className="link" value="popular">popular</option>
                <option className="link" value="lowToHigh">Price low to high</option>
                <option className="link" value="highToLow">Price high to low</option>
            </select> */}
            {/* <label htmlFor="sorts" id='sortTitle'>Sort by:</label> */}
            <Box sx={{ minWidth: 120 , position:"relative"}}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Sort by:"
                    onChange={(e)=>handleChange(e.target.value)}
                    >
                    <MenuItem value="popular">Popular</MenuItem>
                    <MenuItem value="lowToHigh">Price low to high</MenuItem>
                    <MenuItem value="highToLow">Price high to low</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
 }
