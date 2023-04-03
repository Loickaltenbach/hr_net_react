import DateSelector from "../components/dateSelector";
import Dropdown from "../components/dropDown";
import departments from "../data/departments";
import states from "../data/states";
import CustomInput from '../components/customInput';
import Container from "../components/sectionContainer";

const CreationScreen = () => {
    return (
        <div>
            <CustomInput title='First Name' />
            <CustomInput title='Last Name' />
            <DateSelector title='Date of Birth' onDateChange={() => {}} />
            <DateSelector title='Start Date' onDateChange={() => {}} />
            <Container 
                title="Address" 
                children={
                    <div>
                        <CustomInput title='Street' />
                        <CustomInput title='City' />
                        <Dropdown title='State' onSelect={() => {}} defaultLabel={states[0].label} items={states} />
                        <CustomInput title='Zip Code' />
                    </div>
                }
            />
            <Dropdown title='Department' onSelect={() => {}} defaultLabel={departments[0].label} items={departments} />
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 10}}>
                <button>Save</button>
            </div>
            
        </div>
    );
}

export default CreationScreen;