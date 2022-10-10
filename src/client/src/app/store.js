import myBagReducer from '../slices/myBagSlice';
import myFavoritesReducer from '../slices/myFavoritesSlice'
import userReduser from '../slices/userSlice'
import signInReducer from '../slices/signInSlice'
import ordersReduser from '../slices/ordersSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    myBag: myBagReducer,
    myFavorites: myFavoritesReducer,
    user: userReduser,
    signIn: signInReducer,
    orders: ordersReduser
  },
})
