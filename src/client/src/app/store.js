import myBagReducer from '../slices/myBagSlice';
import myFavoritesReducer from '../slices/myFavoritesSlice'
import userReduser from '../slices/userSlice'
import signInReducer from '../slices/signInSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    myBag: myBagReducer,
    myFavorites: myFavoritesReducer,
    user: userReduser,
    signIn: signInReducer
  },
})
