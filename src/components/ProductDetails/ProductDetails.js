import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './ProductDetails.css';
import AuthUser from './../Axios/AuthUser';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { id } = useParams();
    const { http } = AuthUser();
    const [p, setP] = useState([]);

    console.log(id);
    useEffect(() => {
        http.get('/product/' + id)
            .then(res => {
                setP(res.data);
            })
    }, []);

    console.log(p);
    return (
        <Container className=''>
            <div className="row align-items-center">
                <div className="col-lg-4">
                    <img width='100%' src={p.img} alt="" />
                </div>
                <div className="col-lg-8">
                    <h5 style={{ fontSize: '25px' }}>{p.name}</h5>
                    <span style={{ color: 'red', fontSize: '20px' }}>Price $ {p.price}</span>
                    <p className='mt-3'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt ullam, quis vel aspernatur assumenda possimus iste modi distinctio dolorem, maiores illum quaerat quas soluta, voluptatem facilis dolorum laboriosam aperiam nisi!</p>
                    <a href="#0" className='btn btn-warning'>Add To Cart</a>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetails;