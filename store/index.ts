import { configureStore } from "@reduxjs/toolkit";
import web3provider from "./web3provider";
import image from "./image";
import address from "./address";
import contract from "./contract";
import firebase from "./firebase";

export const store = configureStore({
  reducer: {
    image: image,
    web3provider: web3provider,
    address: address,
    contract: contract,
    firebase: firebase
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

