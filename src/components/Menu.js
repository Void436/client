import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./menu.css";

const Menu = ({ history }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
        history.push('/login');
    };

    useState(() => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <div id="qwq">
                <Navbar expand="lg" className="bg-body-tertiary qwq">
                    <h1 id="titree" style={{color: "white", marginLeft: "300px"}}>MGMT</h1>
                    <Container id="pop">
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <div className='w-100'>
                                <Nav className="me-auto menulist" id="menulist" style={{color: "white", marginLeft: "490px", textDecoration: "none"}}>
                                    <Link to="/" style={{textDecoration: "none", color: "#D1B000"}}>Home</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    {!isLoggedIn ? (
                                        <>
                                            <Link to="/login" style={{textDecoration: "none", color: "#D1B000"}}>Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Link to="/register" style={{textDecoration: "none", color: "#D1B000"}}>Register</Link>
                                        </>
                                    ) : (
                                        <Button variant="danger" onClick={handleLogout}>Log Out</Button>
                                    )}
                                </Nav>
                            </div>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Button variant="danger" onClick={handleLogout} style={{display:"flex", float:"right"}}>Log Out</Button>
            </div>
        </>
    )
}

export default Menu
