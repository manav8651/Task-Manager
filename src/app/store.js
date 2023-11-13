import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import taskReducer from '../features/taskSlice'
import userReducer from '../features/usersSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task : taskReducer,
    user: userReducer
  },
})