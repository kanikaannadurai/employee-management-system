import React, { useState, useEffect } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/Employeeservice'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const { id } = useParams();
    
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    const navigate = useNavigate();

    // Update page-kaana letters (values) load panna idhu mukkiyam
    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error("Data load error: ", error);
            })
        }
    }, [id]);

    // EXACT Name: saveorupdateEmployee
    const saveorupdateEmployee = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email };

            if (id) {
                // UPDATE Logic
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                // SAVE Logic
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    navigate('/employees');
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    // Form Validation
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    // Title controller
    function pageTitle() {
        if (id) {
            return <h2 className='text-center mt-3'>Update Employee</h2>
        } else {
            return <h2 className='text-center mt-3'>Add Employee</h2>
        }
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    { pageTitle() }
                    <div className='card-body'>
                        
                        {/* Form-layum same function name update panniyachu */}
                        <form onSubmit={saveorupdateEmployee}>
                            
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter First Name'
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Last Name'
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>

                            <div className='form-group mb-3'>
                                <label className='form-label'>Email Id:</label>
                                <input
                                    type='email'
                                    placeholder='Enter Employee Email'
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>

                            {/* Button onClick-la exact name "saveorupdateEmployee" kuduthachu */}
                            <button 
                                className='btn btn-success' 
                                onClick={saveorupdateEmployee}
                            >
                                Submit
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent