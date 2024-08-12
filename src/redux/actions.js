
import { ADD_PRODUCT, SWITCH_USER, RESET_PRODUCTS } from './actionTypes';

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const switchUser = (userId) => ({
  type: SWITCH_USER,
  payload: userId,
});

export const resetProducts = () => ({
  type: RESET_PRODUCTS,
});
