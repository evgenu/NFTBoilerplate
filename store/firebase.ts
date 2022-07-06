import { createSlice } from '@reduxjs/toolkit'

const firebaseSlice = createSlice({
  name: 'firebase',
  initialState: {
    value: null
  },
  reducers: {
    setFirebase: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { setFirebase } = firebaseSlice.actions;
export default firebaseSlice.reducer;