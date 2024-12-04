import './CreateEmployee.css'
import {useState} from "react";
import {apiClient} from "../interceptor/axiosInterceptor";

export const CreateEmployeeComponent = () => {
    const [employee, setEmployee] = useState({
        name: '', email: '', address: '', deptName: '', desc: ''
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmployee({
            ...employee, [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Employee Added:', employee);
        apiClient.post("/employee/create", employee).then(res =>{
            console.log(res);
        });
        // Here you can send the employee data to a server or API
        setEmployee({name: '', email: '', address: '', deptName: '',desc: ''}); // Reset form
    };

    return (<div className="add-emp-box">
        <h2>Add Employee</h2>
        <form onSubmit={(event) => handleSubmit(event)} className="add-emp-form">
            <div className="add-emp-sub-box">
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={employee.name}
                    onChange={handleChange}
                    placeholder="Enter employee name"
                    required

                />
            </div>

            <div className="add-emp-sub-box">
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={employee.email}
                    onChange={handleChange}
                    placeholder="Enter employee email"
                    required

                />
            </div>

            <div className="add-emp-sub-box">
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={employee.address}
                    onChange={handleChange}
                    placeholder="Enter employee address"
                    required

                />
            </div>

            <div className="add-emp-sub-box">
                <label>Department Name:</label>
                <input
                    type="text"
                    name="deptName"
                    value={employee.deptName}
                    onChange={handleChange}
                    placeholder="Enter employee department name"
                    required

                />
            </div>
            <div className="add-emp-sub-box">
                <label>Description:</label>:
            <input
                type="text"
                name="desc"
                value={employee.desc}
                onChange={handleChange}
                placeholder="Enter employee department name"
                required

            />
    </div>

    <button type="submit" className="btn add-emp-btn">
        Add Employee
    </button>
</form>
</div>)

}