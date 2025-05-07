import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/counter/counterSlice";
import { userSlice } from "./features/user/userSlice";
import logger from "redux-logger";
import { reduxLocalStorage } from "../imports/localStorage";

function saveToLocalStorage(state) {
  try {
    const storage = JSON.stringify(state);
    localStorage.setItem(reduxLocalStorage, storage);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialState = localStorage.getItem(reduxLocalStorage);
    if (serialState === null) return undefined;
    return JSON.parse(serialState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const rootReducer = combineSlices(counterSlice, userSlice);
const allMiddleWare = [];
allMiddleWare.push(logger);
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allMiddleWare),
  preloadedState: loadFromLocalStorage(),
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
