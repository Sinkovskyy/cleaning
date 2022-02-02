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




const AuthPage: React.FC = () => {



    const auth = (e: React.SyntheticEvent) => {
        e.preventDefault();

        const login = (document.querySelector('.login') as HTMLInputElement).value as string;
        const password = (document.querySelector('.password') as HTMLInputElement).value as string;

        authService.login(login, password).then(response => {

            if (response) {
                if (response.type === AccessTypes.admin) {
                    window.location.href = "/admin";
                }

                if (response.type === AccessTypes.common) {
                    window.location.href = "/account";
                }
            }
        });



    };



    return (

        <Container >
            <h1>Login</h1>
            <Form >
                <Form.Group className="mb-3" >
                    <Form.Label>Login</Form.Label>
                    <Form.Control type="login" className="login" placeholder="Enter login" />

                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" className="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={auth}>
                    Submit
                </Button>

                <a href="/registration">Registrate</a>
            </Form>

        </Container>
    );
};


export default AuthPage;