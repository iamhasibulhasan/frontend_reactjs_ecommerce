import React, { useEffect, useState } from 'react';
import AuthUser from '../../Axios/AuthUser';
import './Dashboard.css';
import AddProduct from './../AddProduct/AddProduct';
import AllProducts from './../AllProducts/AllProducts';

const Dashboard = () => {
    const { user, http } = AuthUser();
    const [userDetails, setUserDetails] = useState([]);


    const [active, setActive] = useState('add');
    const handleActive = (e, active) => {
        e.preventDefault();
        setActive(active);
    }



    return (
        <div className="dashboard">
            <div className="row g-0">
                <div className="col-lg-2 sidebar">
                    <ul>
                        <a onClick={(e) => handleActive(e, 'add')} href="#0">
                            <li className={active === 'add' ? 'active' : ''}>Add Product</li>
                        </a>
                        <a onClick={(e) => handleActive(e, 'all')} href="#0">
                            <li className={active === 'all' ? 'active' : ''}>All Products</li>
                        </a>
                    </ul>
                </div>
                <div className="col-lg-10 main-content">
                    <h4 className='welcome'>Welcome {user.name} !!</h4>
                    {
                        active === 'add' ? <AddProduct></AddProduct> :
                            <AllProducts></AllProducts>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;