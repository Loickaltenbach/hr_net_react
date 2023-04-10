import { Employee } from './types';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';

interface AddEmployeeAction {
  type: typeof ADD_EMPLOYEE;
  payload: Employee;
}


export type EmployeeActionTypes = AddEmployeeAction;

//create a function to update the store when a new employee is added
export function addEmployee(employee: Employee): EmployeeActionTypes {
  return {
    type: ADD_EMPLOYEE,
    payload: employee,
  };
}