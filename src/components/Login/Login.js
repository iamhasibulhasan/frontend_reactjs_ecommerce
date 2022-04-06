import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './Login.css';
import AuthUser from '../Axios/AuthUser';
import { useHistory, useLocation } from "react-router-dom";

const Login = () => {
    const { token } = AuthUser();
    const { http, setToken } = AuthUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        http.post('/login', { email: email, password: password })
            .then((res) => {
                setToken(res.data.user, res.data.access_token);
            })


    };


    if (token) {
        history.push('/');
    }






    return (
        <Container className='mt-5'>
            <div className="card m-auto w-50">
                <div className="card-header">
                    <h3>Login here</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={(e) => handleLogin(e)}>
                        <label htmlFor="" className='mb-2'>Email</label>
                        <input placeholder='Email' type="text" name="email" className='form-control mb-5' onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="" className='mb-2'>Password</label>
                        <input placeholder='Password' type="password" name="password" className='form-control mb-5' onChange={(e) => setPassword(e.target.value)} />


                        <input type="submit" value="Login" className='btn btn-primary' />
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Login;