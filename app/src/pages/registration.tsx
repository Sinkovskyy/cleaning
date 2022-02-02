import React from 'react';
import { Button, Form } from 'react-bootstrap';
import styled from 'styled-components';
import authService from '../services/auth.service';
import { AccessTypes } from '../interfaces/enums/accessTypes';





const Container = styled.div`
   
    max-width:100%;
    width:400px;
    margin:400px auto;
`;




const RegisterPage: React.FC = () => {



    const registrate = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const login = (document.querySelector('.login') as HTMLInputElement).value as string;
        const name = (document.querySelector('.name') as HTMLInputElement).value as string;

        const password = (document.querySelector('.password') as HTMLInputElement).value as string;

        const wallet = Math.floor(Math.random() * 500) + 1;

        authService.register(login, password, name, wallet).then(response => {
            if (response) {
                window.location.href = "/login";
            }
        });




    };



    return (

        <Container >
            <h1>Registration</h1>
            <Form >
                <Form.Group className="mb-3" >
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="login" className="login" placeholder="Enter login" />

                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" className="name" placeholder="Enter your name" />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={registrate}>
                    Registrate
                </Button>

                <a href="/login">Login</a>
            </Form>

        </Container>
    );
};


export default RegisterPage;