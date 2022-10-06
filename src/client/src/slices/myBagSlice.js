import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    myBag: [],
}

export const myBagSlice = createSlice({
    name: 'myBag',
    initialState,
    reducers: {
        initBag:(state , action)=>{
            state.myBag = action.payload
        },
        addToBag:(state , action)=>{
            state.myBag.push(action.payload);
        },
        removeFromBag:(state , action)=>{
            let newArray  = state.myBag.filter(currentItem =>{
                    return (currentItem.cloth.cloth_id !== action.payload.cloth.cloth_id || currentItem.size !== action.payload.size)
                }
             ) 
            state.myBag = [...newArray]
        },
        editItem:(state , action) =>{
            let newArray = state.myBag.map(currentItem=>{
                if(currentItem.cloth.cloth_id === action.payload.item.cloth.cloth_id && currentItem.size === action.payload.item.size){
                    return {...action.payload.item, quantity:action.payload.item.quantity + action.payload.number}
                } else return currentItem 
            })
            state.myBag = [...newArray]
        }
    }
});

export const { addToBag , removeFromBag , editItem , initBag } = myBagSlice.actions;

export default myBagSlice.reducer;
