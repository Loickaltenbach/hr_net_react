import Header from "../components/header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Employee } from "../redux/types";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const EmployeesScreen = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees
  );
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [filterText, setFilterText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterText(searchValue);
    setFilteredEmployees(
      employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    );
  };

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePageChange = (pageNumber: number) => {
    setActivePage(pageNumber);
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(event.target.value));
    setActivePage(1);
  };

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(employees.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <Header title="Current Employees" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <span>
          Show
          <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          entries
        </span>
        <div style={{ marginLeft: "20px", marginRight: "10px" }}>
          <span>
            Search:{" "}
            <input type="text" value={filterText} onChange={handleSearch} />
          </span>
        </div>
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              First Name
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Last Name
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Date of Birth
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Start Date
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Street
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>City</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>State</th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Zip Code
            </th>
            <th style={{ border: "1px solid black", padding: "5px" }}>
              Department
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.birthDate}</td>
              <td>{employee.startDate}</td>
              <td>{employee.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          Showing {indexOfFirstItem + 1} to {indexOfLastItem} of{" "}
          {employees.length} entries
        </div>
        <div className="pagination" style={{display: 'flex', justifyContent: 'space-between', alignItems: "center", width: 150}}>
          <button
            onClick={() => handlePageChange(activePage - 1)}
            disabled={activePage === 1}
          >
            Previous
          </button>
          <p style={{height: 20}}>{activePage}</p>
          <button
            onClick={() => handlePageChange(activePage + 1)}
            disabled={activePage === pageNumbers.length}
          >
            Next
          </button>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NavLink to={"/"}>Home</NavLink>
      </div>
    </div>
  );
};

export default EmployeesScreen;
