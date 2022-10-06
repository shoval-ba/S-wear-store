import myBagReducer from '../slices/myBagSlice';
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    myBag: myBagReducer,
  },
})
