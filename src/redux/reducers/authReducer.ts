import {createSlice} from '@reduxjs/toolkit';

interface AuthState {
  id: string;
  email: string;
  accessToken: string;
  fullname: string;
}

const initialState: AuthState = {
  id: '',
  email: '',
  accessToken: '',
  fullname: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: initialState,
  },
  reducers: {
    addAuth: (state, action) => {
      state.authData = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth} = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData;
