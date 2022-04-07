import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
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
    }, [setProducts]);


    const handleEdit = (e, p) => {
        e.preventDefault();




    }


    const handleDelete = (e, id) => {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                http.post('/destroy/' + id)
                    .then(res => {
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: res.data,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })

              }
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
                                <a onClick={(e) => handleEdit(e, p)} href="#0" className='btn btn-warning btn-sm'>Edit</a>&nbsp;
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

