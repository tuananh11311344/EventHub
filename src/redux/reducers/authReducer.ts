import {createSlice} from '@reduxjs/toolkit';

export interface AuthState {
  id: string;
  email: string;
  accessToken: string;
  fullname: string;
  photoUrl?: string;
  follow_events: string[];
  fcmTokens?: string[];
}

const initialState: AuthState = {
  id: '',
  email: '',
  accessToken: '',
  fullname: '',
  photoUrl: '',
  follow_events: [],
  fcmTokens: []
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
    removeAuth: state => {
      state.authData = initialState;
    },
    addFollowedEvent: (state, action) => {
      state.authData.follow_events = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const {addAuth, removeAuth, addFollowedEvent} = authSlice.actions;
export const authSelector = (state: any) => state.authReducer.authData;
