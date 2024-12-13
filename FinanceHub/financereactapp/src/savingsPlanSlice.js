// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const savingsPlanSlice = createSlice({
  name: 'savingsPlan',
  initialState: {
    Name:""

  },
  reducers: {
    setSavingsPlanInfo: (state, action) => {
        state.Name = action.payload.Name;
       
    },
    clearSavingsPlanInfo: (state) => {
        state.Name = ""
    },
  },
});

export const { setSavingsPlanInfo, clearSavingsPlanInfo } = savingsPlanSlice.actions;
export default savingsPlanSlice.reducer;
