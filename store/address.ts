import { createSlice } from '@reduxjs/toolkit'

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    value: null
  },
  reducers: {
    setAddress: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { setAddress } = addressSlice.actions;
export default addressSlice.reducer;