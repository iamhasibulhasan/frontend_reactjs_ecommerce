import axios from 'axios';
import { useState } from 'react';
import { useHistory } from "react-router-dom";



const AuthUser = () => {

    const history = useHistory();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        return userToken;
    }

    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        const user_details = JSON.parse(userString);

        return user_details;
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const logout = () => {
        sessionStorage.clear();
        getToken();
        window.location.reload(false);
        history.push("/");
    }

    const saveToken = (user, token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.reload(false);
        history.push("/");
        setToken(token);
        setUser(user);

    }

    const http = axios.create({
        baseURL: 'http://127.0.0.1:8000/api',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return {
        http,
        setToken: saveToken,
        token,
        user,
        getToken,
        logout

    }
}

export default AuthUser;