import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";//Setting Reducer in our index.js file
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

//As we are redux-persist(Specially done when we are using redux-persist)
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";//Session storage is alternative-But once Tab is closed,information is lost
//Session storage is to store only for that particular session
import { PersistGate } from "redux-persist/integration/react";
//Main use of Redux Persist-To store user Information even when he closes the Tab
//To clear the Information-User has to remove the cache

//Now we have to resign it-
/*This all part of code is from ReduxJS Toolkit and Redux persist Documentation*/
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);//Having reducer persisted
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>//Setting the Middleware
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],//Ignore Warnings while using redux-persist
      },
    }),
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>{/*Creating our Provider*/}
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />{/*Passing the App*/}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

/*This is Boilerplate to configure our Application*/