import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  persistReducer,
  persistStore,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import authReducer from "./authSlice";
import companyReducer from "./companySlice";
import jobReducer from "./jobSlice";

const createStorage = () => ({
  getItem(key) {
    try {
      return Promise.resolve(localStorage.getItem(key));
    } catch {
      return Promise.resolve(null);
    }
  },
  removeItem(key) {
    try {
      return Promise.resolve(localStorage.removeItem(key));
    } catch {
      return Promise.resolve();
    }
  },
  setItem(key, value) {
    try {
      return Promise.resolve(localStorage.setItem(key, value));
    } catch {
      return Promise.resolve();
    }
  },
});

const storage = createStorage();

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  company: companyReducer,
  job: jobReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
