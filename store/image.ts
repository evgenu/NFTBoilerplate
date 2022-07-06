import { createSlice } from '@reduxjs/toolkit'

const imageSlice = createSlice({
  name: 'image',
  initialState: {
    value: ''
  },
  reducers: {
    setImage: (state, action) => {
      state.value = action.payload; 
    }
  }
});

export const { setImage } = imageSlice.actions;
export default imageSlice.reducer;