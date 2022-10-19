import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
}

export const ordersSlice = createSlice({
    name: 'myBag',
    initialState,
    reducers: {
        // new orders.
        initOrders:(state , action)=>{
            state.orders = action.payload
        },
        // Add cloth ro orders.
        addToOrders:(state , action)=>{
            state.orders.push(action.payload);
        },
        // Delete cloth from orders.
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
