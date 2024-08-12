import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    users: {},
  },
  reducers: {
    createUser: (state, action) => {
      const newUser = action.payload;
      state.users[newUser.id] = newUser;
      state.currentUser = newUser.id;
    },
    addProduct: (state, action) => {
      const { userId, product } = action.payload;
      state.users[userId].products.push(product);
    },
    resetProducts: (state, action) => {
      const userId = action.payload;
      state.users[userId].products = [];
    },
    switchUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { createUser, addProduct, resetProducts, switchUser } = userSlice.actions;
export default userSlice.reducer;
