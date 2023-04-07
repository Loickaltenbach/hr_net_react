import React, { useState } from "react";
import DateSelector from "../components/dateSelector";
import Dropdown from "../components/dropDown";
import departments from "../data/departments";
import states from "../data/states";
import CustomInput from "../components/customInput";
import Container from "../components/sectionContainer";
import { NavLink } from "react-router-dom";
import Header from "../components/header";
import { addEmployee } from "../redux/action";
import { Employee } from "../redux/types";
import Modal from "../components/modal";

const CreationScreen = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    startDate: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    department: "",
  });

  const handleInputChange =
    (field: keyof Employee) =>
    (value: string): void => {
      setEmployee((prevState: any) => ({
        ...prevState,
        [field]: value,
      }));
    };

  const handleSaveClick = (): void => {
    addEmployee(employee);
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
        <NavLink to={"employees"}>View current employees</NavLink>
        <h3>Create Employee</h3>
      </div>
      <Modal isOpen={openModal} onClose={handleCloseModal}>
        <div>
          <h4>Employee saved successfully!</h4>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
      <CustomInput
        title="First Name"
        value={employee.firstName}
        onChangeValue={handleInputChange("firstName")}
      />
      <CustomInput
        title="Last Name"
        value={employee.lastName}
        onChangeValue={handleInputChange("lastName")}
      />
      <DateSelector
        title="Date of Birth"
        onDateChange={handleInputChange("birthDate")}
      />
      <DateSelector
        title="Start Date"
        onDateChange={handleInputChange("startDate")}
      />
      <Container
        title="Address"
        children={
          <div>
            <CustomInput
              title="Street"
              value={employee.street}
              onChangeValue={handleInputChange("street")}
            />
            <CustomInput
              title="City"
              value={employee.city}
              onChangeValue={handleInputChange("city")}
            />
            <Dropdown
              title="State"
              onSelect={handleInputChange("state")}
              defaultLabel={states[0].label}
              items={states}
            />
            <CustomInput
              title="Zip Code"
              value={employee.zip}
              onChangeValue={handleInputChange("zip")}
            />
          </div>
        }
      />
      <Dropdown
        title="Department"
        onSelect={handleInputChange("department")}
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
