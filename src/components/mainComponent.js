import React, { useState, useEffect } from "react";

import StudentRegistrationDataService from "../services/registraion.service";

function RegistrationForm(props) {
    const [name, setName] = useState(null);
    const [dob, setDob] = useState(null);
    const [sclass, setSclass] = useState("I");
    const [gender, setGender] = useState("male");
    const [email, setEmail] = useState(null);
    const [division, setDivision] = useState("A");

    const [students, setStudetns] = useState([]);

    useEffect(() => {
        StudentRegistrationDataService.getAllStudentData()
            .then((response) => {
                if (response.status === 200) {
                    setStudetns(response.data);
                }
                
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    function onChangeName(e) {
        setName(e.target.value);
    }

    function onChangeDob(e) {
        setDob(e.target.value);
    }

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }

    function onChangeClass(e) {
        setSclass(e.target.value);
    }

    function onChangeDivision(e) {
        setDivision(e.target.value);
    }

    function onChangeGender(e) {
        setGender(e.target.value);
    }

    function registerStudent() {
        if(name === null || name === ""){
            alert("enter name");
            return;
        }
        if(dob === null){
            alert("choose date of birth");
            return;
        }

        if(email === null || email === ""){
            alert("enter email");
            return;
        }
        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
            alert("enter a valid email");
            return;
        }

        const data = {
            name,
            dob,
            sclass,
            division,
            email,
            gender,
        };


        StudentRegistrationDataService.create(data)
            .then((response) => {
                if (response.status === 201) {
                    setStudetns(response.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });

    }

    return (
        <>
            <div className="alignleft">
                <div className="submit-form">
                    <div className="py-3">
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            id="name"
                            name="name"
                            onChange={onChangeName}
                        ></input>
                    </div>
                    <label htmlFor="date_b" className="form-label">
                        Date of birth
                    </label>
                    <input
                        type="date"
                        placeholder="Date of birth"
                        id="date_b"
                        name="dtb"
                        className="form-control"
                        onChange={onChangeDob}
                    ></input>

                    <div className="input-group mb-3 py-3">
                        <label>
                            Class
                            <select value={sclass} onChange={onChangeClass}>
                                <option value="I">I</option>
                                <option value="II">II</option>
                                <option value="III">III</option>
                                <option value="IV">IV</option>
                                <option value="VI">VI</option>
                                <option value="VII">VII</option>
                                <option value="VIII">VIII</option>
                                <option value="IX">IX</option>
                                <option value="X">X</option>
                                <option value="XI">XI</option>
                                <option value="XII">XII</option>
                            </select>
                        </label>
                    </div>

                    <div className="input-group mb-3 py-2">
                        <label className="form-label">
                            Division
                            <select value={division} onChange={onChangeDivision}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                            </select>
                        </label>
                    </div>

                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="email"
                        id="email"
                        name="email"
                        onChange={onChangeEmail}
                    ></input>
                    <div className="form-check form-check-inline">

                        <input
                            type="radio"
                            id="male"
                            value="male"
                            name="gender"
                            checked={true}
                            className="form-check-input"
                            onChange={onChangeGender}
                        ></input>

                        <label htmlFor="male" className="form-check-label">
                            male
                        </label>

                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            id="female"
                            value="female"
                            name="gender"
                            className="form-check-input"
                            onChange={onChangeGender}
                        ></input>
                        <label htmlFor="female" className="form-check-label">
                            female
                        </label>
                    </div>
                    <div className="mt-5">
                        <button className="btn btn-success" onClick={registerStudent}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>

            {(students !== [] || students !== null) && students.length !== 0 ? (
                <div className="alignright pb-2">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Admission Number</th>
                                <th>Date of Birth</th>
                                <th>Class</th>
                                <th>Division</th>
                                <th>Email</th>
                                <th>Gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((d, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{d.name}</td>
                                        <td>{d.rg}</td>
                                        <td>{d.dob}</td>
                                        <td>{d.sclass}</td>
                                        <td>{d.division}</td>
                                        <td>{d.email}</td>
                                        <td>{d.gender}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div></div>
            )}
        </>
    );
}

export default RegistrationForm;
