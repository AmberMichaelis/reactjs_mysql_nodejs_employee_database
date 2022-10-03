import './App.css';
import { useState } from "react";
import Axios from 'axios';

function App() {

  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [country, setCountry] = useState('')
  const [position, setPosition] = useState('')
  const [wage, setWage] = useState(0)

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    // console.log(name + age + country + position + wage)
    Axios.post("http://localhost:3001/create", {
      name,
      age,
      country,
      position,
      wage
    }).then(() => {
      setEmployeeList([...employeeList, { name, age, country, position, wage }])
    });
  }

  const getEmployees = () => {
    Axios.get("http://localhost:3001/show", {

    }).then(response => {
      setEmployeeList(response.data);
    });
  }

  return (
    <div className="App">
      <div className="informationInputs">
        <label for="name">Name:</label>
        <input type="text" id="name" onChange={event => { setName(event.target.value) }} />
        <label for="age">Age:</label>
        <input type="number" id="age" onChange={event => { setAge(event.target.value) }} />
        <label for="country">Country:</label>
        <input type="text" id="country" onChange={event => { setCountry(event.target.value) }} />
        <label for="position">Position:</label>
        <input type="text" id="position" onChange={event => { setPosition(event.target.value) }} />
        <label for="wage">Wage (USD):</label>
        <input type="number" min="20000" step="500" max="200000" id="wage" onChange={event => { setWage(event.target.value) }} />
        <div className="btns">
          <button className="addBtn" onClick={addEmployee}>+ Add Employee</button>
        </div>
        {getEmployees()}
        <div id="showEmployeeListHeader" hidden="hidden">
          <p>Name</p>
          <p>Age</p>
          <p>Country</p>
          <p>Position</p>
          <p>Wage</p>
        </div>
        {/* val is the current */}
        {employeeList.map((val, key) => {
          return <div className="showEmployeeList">
            <p className="showName">{val.name}</p>
            <p>{val.age}</p>
            <p>{val.country}</p>
            <p>{val.position}</p>
            <p>{val.wage}</p>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
