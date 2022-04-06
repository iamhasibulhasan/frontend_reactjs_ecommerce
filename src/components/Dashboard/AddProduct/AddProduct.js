import React from 'react';
import './AddProduct.css';
import { useForm } from "react-hook-form";
import AuthUser from './../../Axios/AuthUser';
import Swal from 'sweetalert2';

const AddProduct = () => {
    const { http } = AuthUser();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        http.post('/add-product', { name: data['productName'], price: data['productPrice'], img: data['productImg'] })
            .then((res) => {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Product added',
                    showConfirmButton: false,
                    timer: 1500
                })
            })


        reset();
    };


    return (
        <div>
            <h3>Add products</h3>
            <div className="row">
                <div className="col-lg-8">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label htmlFor="" className='mb-2'>Product Name</label> <span style={{ color: 'red' }}>{errors.productName?.type === 'required' && "Product name is required"}</span>
                        <input className='form-control mb-4' placeholder='Product name' {...register("productName", { required: true })} />


                        <label htmlFor="" className='mb-2'>Product Price</label> <span style={{ color: 'red' }}>{errors.productPrice?.type === 'required' && "Product price is required"}</span>
                        <input className='form-control mb-4' placeholder='Product price' {...register("productPrice", { required: true })} />



                        <label htmlFor="" className='mb-2'>Product Image Url</label> <span style={{ color: 'red' }}>{errors.productImg?.type === 'required' && "Image url is required"}</span>
                        <input className='form-control mb-4' placeholder='Product image url' {...register("productImg", { required: true })} />


                        <input className='btn btn-primary' type="submit" value='Add product' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;