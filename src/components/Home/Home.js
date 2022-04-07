import React, { useEffect, useState } from 'react';
import './Home.css';
import { Card, Container } from 'react-bootstrap';
import AuthUser from './../Axios/AuthUser';
import { Link } from 'react-router-dom';

const Home = () => {
    const { http } = AuthUser();
    const [products, setProducts] = useState([]);


    useEffect(() => {
        http.get('/all-product')
            .then(res => {
                setProducts(res.data);
            })
    }, [setProducts]);

    console.log(products);

    return (
        <Container>
            <h2 className='mt-5'>First 10 dishes are here</h2>

            <div className="products">


                {
                    products.slice(0, 10).map(p => <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={p.img} />
                        <Card.Body className='text-center'>
                            <Card.Title>{p.name}</Card.Title>
                            <Card.Text>
                                Price : $ {p.price}
                            </Card.Text>
                            <Link to='/' className='btn btn-warning btn-sm'>Buy Now</Link>
                        </Card.Body>
                    </Card>)
                }


            </div>


        </Container>
    );
};

export default Home;