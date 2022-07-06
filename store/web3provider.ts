import { createSlice } from '@reduxjs/toolkit'

const web3providerSlice = createSlice({
  name: 'web3provider',
  initialState: {
    value: null
  },
  reducers: {
    setWeb3Provider: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { setWeb3Provider } = web3providerSlice.actions;
export default web3providerSlice.reducer;