import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myFavorites: [],
}

export const myFavoritesSlice = createSlice({
    name: 'myBag',
    initialState,
    reducers: {
        initFavorites:(state , action)=>{
            state.myFavorites = action.payload
        },
        addToFavorites:(state , action)=>{
            state.myFavorites.push(action.payload);
        },
        removeFromFavorites:(state , action)=>{
            let newArray  = state.myFavorites.filter(currentItem =>{
                    return (currentItem.cloth_id !== action.payload.cloth_id )
                }
             ) 
            state.myFavorites = [...newArray]
        },
    }
});

export const { addToFavorites , removeFromFavorites , initFavorites } = myFavoritesSlice.actions;

export default myFavoritesSlice.reducer;
