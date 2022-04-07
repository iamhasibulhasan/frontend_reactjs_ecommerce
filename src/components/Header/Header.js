import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthUser from '../Axios/AuthUser';
import './Header.css';

const Header = () => {
    let type;
    const { token, logout, user = '0' } = AuthUser();
    // console.log(user);

    const logoutUser = () => {
        if (token !== undefined) {
            logout();
        }
    }

    if (user.type) {
        type = user.type;
    }
    console.log(type);


    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">React CURD</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto align-items-center">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>

                        {
                            type == 0 ? <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link> :
                                type == 1 ? <Nav.Link as={Link} to="/profile">Profile</Nav.Link> :
                                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                        }
                        {

                        }




                        {
                            token ? <Nav.Link as={Link} onClick={logoutUser} to="/login">Logout</Nav.Link> :
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        }


                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;