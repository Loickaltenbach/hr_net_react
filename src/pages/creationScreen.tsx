import React, { useState } from "react";
import DateSelector from "../components/dateSelector";
import Dropdown from "custom-dropdown-ocproject14";
import departments from "../data/departments";
import states from "../data/states";
import CustomInput from "../components/customInput";
import Container from "../components/sectionContainer";
import { NavLink } from "react-router-dom";
import Header from "../components/header";
import { addEmployee } from "../redux/action";
import { Employee } from "../redux/types";
import Modal from "../components/modal";
import { useDispatch } from "react-redux";

type MenuItem = {
  label: string;
  value: string;
};

const CreationScreen = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  //create an id generator
  const idGenerator = (): number => {
    return Math.floor(Math.random() * 1000000);
  };

  //create a new employee object with setters
  const [employee, setEmployee] = useState<Employee>({
    id: idGenerator().toString(),
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    state: states[0].value,
    zip: "",
    department: departments[0].value,
  });

  const [selectedState, setSelectedState] = useState<MenuItem | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<MenuItem | null>(null);

  const handleInputChange = (key: string, value: string): void => {
    if(!key) return;
    setEmployee({ ...employee, [key]: value });
  };

  const handleDateChange = (key: string) => (value: string): void => {
    setEmployee({ ...employee, [key]: value });
  };

  const handleDropdownChange = (key: string, item: MenuItem) => {
    if(!key) return;
    setEmployee({ ...employee, [key]: item.value });
  }
  const handleSaveClick = (): void => {
    dispatch(addEmployee(employee));
    setOpenModal(true);
  };

  const handleCloseModal = (): void => {
    setOpenModal(false);
  };

  return (
    <div>
      <Header title="HR Net" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NavLink style={{color: 'blue'}} to={"employees"}>View current employees</NavLink>
        <h3>Create Employee</h3>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div>
          <p>Employee created!</p>
        </div>
      </Modal>
      <CustomInput
        id={"firstName"}
        title="First Name"
        value={employee.firstName}
        onChangeValue={(firstName) => handleInputChange("firstName", firstName)}
      />
      <CustomInput
        id={"lastName"}
        title="Last Name"
        value={employee.lastName}
        onChangeValue={(lastName) => handleInputChange("lastName", lastName)}
      />
      <DateSelector
        id={"birthDate"}
        title="Date of Birth"
        onDateChange={handleDateChange("birthDate")}
      />
      <DateSelector
        id={"startDate"}
        title="Start Date"
        onDateChange={handleDateChange("startDate")}
      />
      <Container
        title="Address"
        children={
          <div>
            <CustomInput
              id={"street"}
              title="Street"
              value={employee.street}
              onChangeValue={(street) => handleInputChange("street", street)}
            />
            <CustomInput
              id={"city"}
              title="City"
              value={employee.city}
              onChangeValue={(city) => handleInputChange("city", city)}
            />
            <Dropdown
              title="State"
              selectedItem={selectedState}
              setSelectedItem={setSelectedState}
              onSelect={(item: MenuItem) => handleDropdownChange("state", item)}
              defaultLabel={states[0].label}
              items={states}
            />
            <CustomInput
              id={"zip"}
              type="number"
              title="Zip Code"
              value={employee.zip}
              onChangeValue={(zip) => handleInputChange("zip", zip)}
            />
          </div>
        }
      />
      <Dropdown
        title="Department"
        selectedItem={selectedDepartment}
        setSelectedItem={setSelectedDepartment}
        onSelect={(item: MenuItem) => handleDropdownChange("department", item)}
        defaultLabel={departments[0].label}
        items={departments}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <button onClick={handleSaveClick}>Save</button>
      </div>
    </div>
  );
};

export default CreationScreen;
