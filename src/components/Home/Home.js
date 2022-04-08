import React, { useEffect, useState } from 'react';
import './Home.css';
import { Card, Container, Alert, Row } from 'react-bootstrap';
import AuthUser from './../Axios/AuthUser';
import { Link } from 'react-router-dom';

const Home = () => {
    const { http } = AuthUser();
    const [products, setProducts] = useState([]);

    const handleSearch = (e) => {
        e.preventDefault();
        let search = e.target.value || 'all';


        http.get('/searchProduct/' + search)
            .then(res => {
                setProducts(res.data);
                console.log(res.data);
            })
    }

    useEffect(() => {
        http.get('/all-product')
            .then(res => {
                setProducts(res.data);
            })
    }, [setProducts]);



    return (
        <Container className='mt-5'>
            <Alert variant="success">
                <div className="row">
                    <div className="col-lg-6">
                        <Alert.Heading>Admin Credentials</Alert.Heading>
                        <pre>
                            Email: admin@gmail.com
                        </pre>
                        <pre>
                            Password: asdfghjkl
                        </pre>
                    </div>
                    <div className="col-lg-6">
                        <Alert.Heading>User Credentials</Alert.Heading>
                        <pre>
                            Email: user@gmail.com
                        </pre>
                        <pre>
                            Password: asdfghjkl
                        </pre>
                    </div>
                </div>
            </Alert>

            <div className="search-div my-5">
                <input onChange={handleSearch} type="text" className='form-control' placeholder='Search your dish...' />

            </div>
            <span>Found dishes: <strong>{products.length}</strong></span>

            <div className="products">


                {
                    products.slice(0, 10).map(p => <Card
                        key={p.id}
                        style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={p.img} />
                        <Card.Body className='text-center'>
                            <Card.Title>{p.name}</Card.Title>
                            <Card.Text>
                                Price : $ {p.price}
                            </Card.Text>
                            <Link to={`/product/${p.id}`} className='btn btn-warning btn-sm'>Buy Now</Link>
                        </Card.Body>
                    </Card>)
                }


            </div>


        </Container>
    );
};

export default Home;