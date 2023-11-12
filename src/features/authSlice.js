import { createSlice } from '@reduxjs/toolkit'

const initialState = null

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthData: (state, action) => {
        return (action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const {  setAuthData } = authSlice.actions

export default authSlice.reducer