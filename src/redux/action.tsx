import { Employee } from './types';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';

interface AddEmployeeAction {
  type: typeof ADD_EMPLOYEE;
  payload: Employee;
}


export type EmployeeActionTypes = AddEmployeeAction;

export function addEmployee(employee: Employee): AddEmployeeAction {
  return {
    type: ADD_EMPLOYEE,
    payload: employee,
  };
}