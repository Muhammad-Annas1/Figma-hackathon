import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "@/components/storage"; // Custom storage utility
import productsReducer from "./features/products/productsSlice"; // Reducer for product data
import cartsReducer from "./features/carts/cartsSlice"; // Reducer for cart data

// Configuration for redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state
  storage, // Use custom storage for persistence
  version: 1, // Version of the persisted state
  whitelist: ["carts"], // Only persist the "carts" slice of state
};

// Combine all reducers (products and carts)
const rootReducer = combineReducers({
  products: productsReducer, // Products state
  carts: cartsReducer, // Carts state
});

// Create a persisted reducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store creation function
export const makeStore = () => {
  // Configure the store with persisted reducer
  const store = configureStore({
    reducer: persistedReducer, // Use the persisted reducer
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in non-production environments
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Disable serializability check for certain non-serializable values
      }),
  });

  // Create a persistor to manage persistence
  const persistor = persistStore(store);
  
  // Return the store and persistor
  return { store, persistor };
};

// Instantiate the store
const store = makeStore().store;

// Type inference for store, state, and dispatch
export type AppStore = typeof store; // Store type
export type RootState = ReturnType<typeof store.getState>; // Root state type
export type AppDispatch = typeof store.dispatch; // Dispatch type

// Export the store for use in the app
export { store };
