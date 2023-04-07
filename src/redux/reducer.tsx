import { Employee } from './types';
import { ADD_EMPLOYEE, EmployeeActionTypes } from './action';

export interface EmployeesState {
  employees: Employee[];
}

const initialState: EmployeesState = {
  employees: [],
};

export default function employeesReducer(
  state = initialState,
  action: EmployeeActionTypes
): EmployeesState {
  if (action.type === ADD_EMPLOYEE) {
    return {
      ...state,
      employees: [...state.employees, action.payload],
    };
  }
  return state;
}