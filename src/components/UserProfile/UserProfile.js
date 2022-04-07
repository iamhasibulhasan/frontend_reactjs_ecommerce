import React from 'react';
import { Badge, Card, Container } from 'react-bootstrap';
import './UserProfile.css';
import AuthUser from './../Axios/AuthUser';

const UserProfile = () => {
    const { user } = AuthUser();
    return (
        <Container className='mt-5'>
            <div className='d-flex justify-content-around'>
                <Card className='w-50 align-items-center'>
                    <Card.Body>
                        <h4>{user.name}</h4>
                        <p>{user.email}</p>
                        <p>Status : <Badge bg="success">{user.status == 1 ? 'Active' : ''}</Badge></p>
                    </Card.Body>
                </Card>
            </div>
        </Container>
    );
};

export default UserProfile;