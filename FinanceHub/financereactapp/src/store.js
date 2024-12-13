// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import savingsPlanReducer from './savingsPlanSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    savingsPlan:savingsPlanReducer,
    // Add other reducers as needed
  },
});

export default store;
