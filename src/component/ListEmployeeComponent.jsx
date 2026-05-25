import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../services/Employeeservice'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        getAllEmployees();
        
    }, [])

    function getAllEmployees(){
        listEmployees().then((response) => {
            setEmployees(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function addNewEmployee() {
        navigate('/add-employee')
    }

    // Fixed: Correct backticks (`) and exact spelling used here
    const updateEmployee = (id) => {
        navigate(`/update-employee/${id}`);
    }

    function removeEmployee(id){
        console.log(id);
        deleteEmployee(id).then((response) =>{
           getAllEmployees();
        }).catch(error =>{
            console.error(error);
        })

    }

    return (
        <div className='container'>
            <h2 className='text-center'>List of Employees</h2>
            <button className='btn btn-primary mb-2' onClick={addNewEmployee}>Add Employee</button>
            <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee FirstName</th>
                        <th>Employee LastName</th>
                        <th>Employee email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(employee => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.firstName}</td>
                                <td>{employee.lastName}</td>
                                <td>{employee.email}</td>
                                <td>
                                    {/* Fixed: Directly passing the function on click safely */}
                                    <button 
                                        className='btn btn-info' 
                                        onClick={() => updateEmployee(employee.id)}
                                    >
                                        Update
                                    </button>
                                     <button 
                                        className='btn btn-danger' 
                                        onClick={() => removeEmployee(employee.id)}
                                    
                                    style={{ marginLeft:"20px"}}


                                        >Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListEmployeeComponent