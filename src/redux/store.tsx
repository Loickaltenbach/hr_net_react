import { combineReducers, createStore } from "redux";
import employeesReducer from "./reducer";
import { Employee } from "../redux/types";

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
const store = createStore(rootReducer);

export default store;