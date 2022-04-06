import React, { useState } from 'react';
import './Register.css';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import AuthUser from './../Axios/AuthUser';

const Register = () => {
    const { http, token } = AuthUser();
    const history = useHistory();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {

        http.post('/register', { name: data['name'], email: data['email'], password: data['password'] })
            .then((res) => {
                history.push("/");
            })


        reset();
    }

    if (token) {
        history.push("/");
    }


    return (
        <div className='register'>
            <div className="card w-50 m-auto mt-5">
                <div className="card-header">
                    <h3>Register New User</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <label htmlFor="">Full Name *</label> &nbsp;
                        <span style={{ color: 'red' }}>{errors.name?.type === 'required' && "Full name is required"}</span>
                        <input name='name' className='form-control'{...register("name", { required: true })} />
                        <label htmlFor="">Email *</label>
                        &nbsp;
                        <span style={{ color: 'red' }}>{errors.email?.type === 'required' && "Email is required"}</span>
                        <input name='email' className='form-control' {...register("email", { required: true })} />
                        <label htmlFor="">New Password *</label>&nbsp;
                        <span style={{ color: 'red' }}>{errors.password?.type === 'required' && "Password is required"}</span>
                        <input name='password' className='form-control' {...register("password", { required: true })} />

                        <input className='btn btn-success' type="submit" />
                    </form>
                </div>
            </div>
        </div >
    );
};

export default Register;