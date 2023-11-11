import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const allUsers = [{
    name: 'Manav Raj',
    role: 1, // Admin
    email: 'test@gmail.com',
    password: 'password'
},
{
    name: 'Manav Raj',
    role: 2, // Controlled
    email: 'test@gmail.com',
    password: 'password'
},
{
    name: 'Manav Raj',
    role: 3, // Head Coach
    email: 'test@gmail.com',
    password: 'password'
},
{
    name: 'Manav Raj',
    role: 4, // Coach
    email: 'test@gmail.com',
    password: 'password'
},


]
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
   
    setAuthData: (state, action) => {

        console.log(action.payload)
        return (action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const {  setAuthData } = authSlice.actions

export default authSlice.reducer