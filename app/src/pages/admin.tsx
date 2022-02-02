import React from 'react';
import AdminCleanersList from '../components/adminCleanersList';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap'
import authService from '../services/auth.service';
import AdminOrderList from '../components/adminOrderList';



const AdminPage: React.FC = props => {


    const navigate = useNavigate();

    const logout = () => {

        authService.logout().then(response => {
            navigate('/');
        });

    }

    return (
        <>
            <Button onClick={logout}>Logout</Button>
            <AdminCleanersList />
            <AdminOrderList />
        </>
    );
};


export default AdminPage;