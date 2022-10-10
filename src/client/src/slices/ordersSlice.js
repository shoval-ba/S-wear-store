import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
}

export const ordersSlice = createSlice({
    name: 'myBag',
    initialState,
    reducers: {
        initOrders:(state , action)=>{
            state.orders = action.payload
        },
        addToOrders:(state , action)=>{
            state.orders.push(action.payload);
        },
        removeFromOrders:(state , action)=>{
            let newArray  = state.orders.filter(currentItem =>{
                    return (currentItem.cloth_id !== action.payload.cloth_id )
                }
             ) 
            state.orders = [...newArray]
        },
    }
});

export const { addToOrders , removeFromOrders , initOrders } = ordersSlice.actions;

export default ordersSlice.reducer;
