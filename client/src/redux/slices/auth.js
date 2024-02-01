import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from './../../axiosAPI.js';


export const registration = createAsyncThunk(
   'auth-registration',
   async (params) => {
      const {data} = await axios.post('/register', params)
      return data
   }
)

export const loginisation = createAsyncThunk(
   'auth-loginisation',
   async (params) => {
      const {data} = await axios.post('/login', params)
      return data
   }
)

export const fetchUserData = createAsyncThunk(
   'fetchUserData',
   async () => {
      const {data} = await axios.get('/user')
      return data
   }
)

const initialState = {
   userEmail: null,
   status: 'loading',
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.userEmail = null;
         window.localStorage.removeItem('token')
      }
   },
   extraReducers: builder => {
      builder
         .addCase(registration.pending, (state) => {
            state.userEmail = null
            state.status = 'loading'
         })
         .addCase(registration.fulfilled, (state, action) => {
            state.userEmail = action.payload.email
            state.status = 'loaded'
         })
         .addCase(registration.rejected, (state) => {
            state.userEmail = null
            state.status = 'error'
         })
         
         .addCase(loginisation.pending, (state) => {
            state.userEmail = null
            state.status = 'loading'
         })
         .addCase(loginisation.fulfilled, (state, action) => {
            state.userEmail = action.payload.email
            state.status = 'loaded'
         })
         .addCase(loginisation.rejected, (state) => {
            state.userEmail = null
            state.status = 'error'
         })

         .addCase(fetchUserData.pending, (state) => {
            state.userEmail = null
            state.status = 'loading'
         })
         .addCase(fetchUserData.fulfilled, (state, action) => {
            state.userEmail = action.payload.email
            state.status = 'loaded'
         })
         .addCase(fetchUserData.rejected, (state) => {
            state.userEmail = null
            state.status = 'error'
         })
   }
})

export const isAuthSelector = (state) => Boolean(state.auth.userEmail)
export const authReducer = authSlice.reducer

export const {logout} = authSlice.actions