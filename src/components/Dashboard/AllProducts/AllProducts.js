import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import AuthUser from '../../Axios/AuthUser';
import './AllProducts.css';

const AllProducts = () => {
    const { http } = AuthUser();
    const [products, setProducts] = useState([]);
    const [show, setShow] = useState(false);


    const [id, setId] = useState('');
    const [pName, setPName] = useState('');
    const [pPrice, setPPrice] = useState('');
    const [url, setUrl] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    useEffect(() => {
        http.get('/all-product')
            .then(res => {
                setProducts(res.data);
            })
    }, [products]);


    const handleEdit = (e, p) => {
        e.preventDefault();


        setId(p.id);
        setPName(p.name);
        setPPrice(p.price);
        setUrl(p.img);


        handleShow();

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
    const handleChangeName = (e) => {
        setPName(e.target.value);
    }
    const handleChangePrice = (e) => {
        setPPrice(e.target.value);
    }
    const handleChangeUrl = (e) => {
        setUrl(e.target.value);
    }
    const handleUpdate = (e) => {
        e.preventDefault();

        http.post('/update', { id: id, name: pName, price: pPrice, img: url })
            .then((res) => {
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
    return (
        <>
        <div>
            <h4>All Products</h4>
                <table className='table table-hover'>
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

            <Modal show={show} onHide={handleClose} centered size='md'>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="edit-modal">
                            <h6>Product Name</h6>
                            <input onChange={handleChangeName} type="text" placeholder='Name' className='mb-4 form-control' value={pName} />
                        </div>
                        <div className="edit-modal">
                            <h6>Product Price</h6>
                            <input onChange={handleChangePrice} type="text" placeholder='Price' className='mb-4 form-control' value={pPrice} />
                        </div>
                        <div className="edit-modal">
                            <h6>Image Url</h6>
                            <input onChange={handleChangeUrl} type="text" placeholder='Image url' className='mb-4 form-control' value={url} />
                        </div>
                        <img width='50%' src={url} alt="" />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>



        </>
    );
};

export default AllProducts;

