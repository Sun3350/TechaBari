import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null, 
   // token: localStorage.getItem('token') || null// Add an error field to the initial state
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
      //localStorage.setItem('token', action.payload.token)
    },
    loginFailure: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload.message;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
     // localStorage.removeItem('token')
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export const loadTokenFromLocalStorage = () => (dispatch) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Dispatch the loginSuccess action with the token
    dispatch(loginSuccess({ user: null, token }));
  }
};


  
export default authSlice.reducer;
