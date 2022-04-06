import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import AuthUser from '../../Axios/AuthUser';
import './AllProducts.css';

const AllProducts = () => {
    const { http } = AuthUser();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        http.get('/all-product')
            .then(res => {
                setProducts(res.data);
            })
    }, []);

    const handleEdit = (e, id) => {
        e.preventDefault();
        http.post('/edit')
            .then(res => {
                console.log(res.data);
            })
    }


    const handleDelete = (e, id) => {
        e.preventDefault();
        http.post('/destroy/' + id)
            .then(res => {
                console.log(res.data);
            })
    }

    return (
        <div>
            <h4>All Products</h4>
            <table className='table'>
                <thead>
                    <tr>
                        <th>#SI</th>
                        <th>Product name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((p, index) => <tr
                            key={p.id}
                        >
                            <td>{index + 1}</td>
                            <td>{p.name}</td>
                            <td>{p.price}</td>
                            <td>
                                <img width='50' src={p.img} alt="" />
                            </td>
                            <td>
                                <a onClick={(e) => handleEdit(e, `${p.id}`)} href="#0" className='btn btn-warning btn-sm'>Edit</a>&nbsp;
                                <a onClick={(e) => handleDelete(e, `${p.id}`)} href="#0" className='btn btn-danger btn-sm'>Delete</a>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllProducts;