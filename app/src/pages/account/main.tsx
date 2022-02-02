import React from 'react';
import CleanersList from '../../components/cleanersList';
import Header from '../../components/account/header';
import OrdersList from '../../components/ordersList';



const AccountMainPage: React.FC = () => {




    return (
        <>
            <Header />
            <CleanersList />
            <OrdersList />
        </>
    );
};


export default AccountMainPage;