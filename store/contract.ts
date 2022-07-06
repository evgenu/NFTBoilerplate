import { createSlice } from '@reduxjs/toolkit'

const contractSlice = createSlice({
  name: 'address',
  initialState: {
    value: null
  },
  reducers: {
    setContract: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { setContract } = contractSlice.actions;
export default contractSlice.reducer;