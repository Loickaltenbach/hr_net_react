import Header from "../components/header";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Employee } from "../redux/types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Sorting from "../components/sorting";

const EmployeesScreen = () => {
  const employees = useSelector(
    (state: RootState) => state.employees.employees || []
  );
  const [filteredEmployees, setFilteredEmployees] =
    useState<Employee[]>(employees);
  const [filterText, setFilterText] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    setFilterText(searchValue);
    setFilteredEmployees(
      employees.filter((employee) =>
        `${employee.firstName} ${employee.lastName} ${employee.department} ${employee.state} ${employee.city} ${employee.street} ${employee.zip} ${employee.birthDate} ${employee.startDate}`
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      )
    );
  };

  const handleSorting = (sortBy: string, order: string) => {
    const sortedEmployees = [...filteredEmployees as any];

    if (order === "asc") {
      sortedEmployees.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    } else {
      sortedEmployees.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) {
          return -1;
        }
        if (a[sortBy] < b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }
  
    setFilteredEmployees(sortedEmployees);
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

  //date formatter from string to mm/dd/yyyy
  const dateFormatter = (date: string) => {
    const dateObj = new Date(date);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <div style={{ width: 850 }}>
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
            <input id="search" aria-label="Search" type="text" value={filterText} onChange={handleSearch} />
          </span>
        </div>
      </div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="firstName" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="lastName" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="startDate" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="department" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="birthDate" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="street" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="city" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="state" handleSorting={handleSorting} />
            </th>
            <th style={{ padding: "5px", fontWeight: "bold" }}>
              <Sorting sortBy="zipCode" handleSorting={handleSorting} />
            </th>
          </tr>
        </thead>
        <tbody
          style={{
            borderBottom: "1px solid black",
            borderTop: "1px solid black",
          }}
        >
          {filteredEmployees.map((employee, index) => (
            <tr
              key={employee.id}
              style={{
                backgroundColor: index % 2 === 0 ? "lightgray" : "white",
                height: 35,
                borderBottom:
                  index === indexOfLastItem ? "black" : "1px solid lightgray",
                padding: "5px",
              }}
            >
              <td style={{ padding: 10 }}>{employee.firstName || ""}</td>
              <td style={{ padding: 10 }}>{employee.lastName || ""}</td>
              <td style={{ padding: 10 }}>
                {employee.startDate ? dateFormatter(employee.startDate) : ""}
              </td>
              <td style={{ padding: 10 }}>{employee.department}</td>
              <td style={{ padding: 10 }}>
                {employee.birthDate ? dateFormatter(employee.birthDate) : ""}
              </td>
              <td style={{ padding: 10 }}>{employee.street || ""}</td>
              <td style={{ padding: 10 }}>{employee.city || ""}</td>
              <td style={{ padding: 10 }}>{employee.state}</td>
              <td style={{ padding: 10 }}>{employee.zip || ""}</td>
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
        <div
          className="pagination"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: 150,
          }}
        >
          <p
            style={{ cursor: activePage === 1 ? "not-allowed" : "pointer" }}
            onClick={() => activePage !== 1 && handlePageChange(activePage - 1)}
          >
            Previous
          </p>
          <button
            style={{ height: 40, width: 40, border: "1px solid lightgray" }}
          >
            {activePage}
          </button>
          <p
            style={{
              cursor:
                activePage === pageNumbers.length ? "not-allowed" : "pointer",
            }}
            onClick={() =>
              activePage !== pageNumbers.length &&
              handlePageChange(activePage + 1)
            }
          >
            Next
          </p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NavLink to={"/"}>Home</NavLink>
      </div>
    </div>
  );
};

export default EmployeesScreen;
