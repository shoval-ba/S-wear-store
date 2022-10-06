import myBagReducer from '../slices/myBagSlice';
import myFavoritesReducer from '../slices/myFavoritesSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    myBag: myBagReducer,
    myFavorites: myFavoritesReducer,
  },
})
