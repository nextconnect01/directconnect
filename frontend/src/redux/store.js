import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import socketSlice from "./socketSlice.js"
import rtnSlice from "./rtnSlice.js"
import applicationSlice from "./applicationSlice.js"
import authSlice from "./authSlice.js"
import blogSlice from "./blogSlice.js"
import jobSlice from "./jobSlice.js";
import chatSlice from "./chatSlice.js"

const persistConfig = {
    key: 'my_current_project',
    version: 1,
    storage,
    blacklist: ["socketio"],
}

const rootReducer = combineReducers({
    socketio : socketSlice,
    auth : authSlice,
    blog : blogSlice,
    job : jobSlice,
    application : applicationSlice,
    realTimeNotification: rtnSlice,
    chat : chatSlice,
    
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware({
        serializableCheck: false, // Required for redux-persist
      }),
  });
export default store
