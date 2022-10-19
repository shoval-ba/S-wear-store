import { React, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "../../styles/Sort.scss";

export default function Sort(props) {

    const clothes = props.clothes;
    let sorted = [];
    const [valueText, setValue] = useState("");

    // Sorted the clothes.
    const handleChange = (value) => {
        setValue(value);
        if (value === "lowToHigh") {
            sorted = clothes.slice().sort((a, b) => {
                return a.price - b.price;
            });
            props.setClothes(sorted);
        }
        if (value === "highToLow") {
            sorted = clothes.slice().sort((a, b) => {
                return a.price - b.price;
            });
            sorted.reverse();
            props.setClothes(sorted);
        }
        if (value === "popular") {
            sorted = clothes.slice().sort((a, b) => {
                return 0.5 - Math.random();
            });
            props.setClothes(sorted)
        }
    }

    useEffect(() => {
        handleChange(valueText);
    }, [props.sector])

    return (
        <div id='sort'>
            <Box sx={{ minWidth: 120, position: "relative" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Sort by:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={valueText}
                        label="Sort by:"
                        onChange={(e) => handleChange(e.target.value)}
                    >
                        <MenuItem value={"popular"}>Popular</MenuItem>
                        <MenuItem value={"lowToHigh"}>Price low to high</MenuItem>
                        <MenuItem value={"highToLow"}>Price high to low</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>
    )
}
