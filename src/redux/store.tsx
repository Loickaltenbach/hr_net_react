import { combineReducers } from "redux";
import employeesReducer from "./reducer";
import { Employee } from "../redux/types";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


// Define the EmployeesState interface
export interface EmployeesState {
  employees: Employee[];
}

// Combine the reducers
const rootReducer = combineReducers({
  employees: employeesReducer,
});

// Define the RootState interface
export interface RootState {
  employees: EmployeesState;
}

const persistConfig = {
  key: 'root',
  storage,
};

// Create the store
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
