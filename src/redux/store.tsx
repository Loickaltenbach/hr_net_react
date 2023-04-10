import { combineReducers } from "redux";
import employeesReducer from "./reducer";
import { Employee } from "../redux/types";
import { configureStore } from "@reduxjs/toolkit";

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

// Create the store
const store = configureStore({
  reducer: rootReducer,
});

export default store;
