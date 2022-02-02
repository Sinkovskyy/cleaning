
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router";
import Header from "../../components/account/header";
import { FlexWrapper } from "../../components/styled/flexWrapper";
import { FlexDirection } from "../../interfaces/enums/flexDirection";
import ICleaner from "../../interfaces/ICleaner";
import cleanerService from "../../services/cleaner.service";
import { OrderStatus } from "../../interfaces/enums/orderStatus";
import authService from "../../services/auth.service";




const CleanerPage: React.FC = (props) => {

    const { name } = useParams()

    const [cleaner, setCleaner] = useState<ICleaner>({} as ICleaner);
    const [wallet, setWallet] = useState<number>();

    useEffect(() => {

        //  Retrieve cleaner data from backend
        if (!Object.keys(cleaner).length) {
            cleanerService.getCleaner(name as string).then(response => {

                if (response) {
                    setCleaner(response.data)
                }
            });
        }


        if (!wallet) {
            authService.getCurrentUserWallet().then(response => {

                if (response) {
                    setWallet(response.data);
                }
            });
        }

    });



    const makeOrder = async (e: React.SyntheticEvent) => {

        const serviceCard = ((e.target as HTMLElement).closest('.service') as HTMLElement);
        const serviceName = (serviceCard.querySelector('.name') as HTMLElement).innerHTML as string;
        const servicePrice = (+(serviceCard.querySelector('.price') as HTMLElement).innerHTML) as number;

        if (wallet as number < servicePrice) {
            alert("Not enough money");
            return;
        }

        await cleanerService.makeOrder(serviceName, cleaner.name, servicePrice, OrderStatus.pending);



        setWallet(wallet as number - servicePrice);

        document.location.reload();
    }


    return (
        <>
            <Header />

            <h1>{cleaner.name}</h1>
            <h2>Services</h2>
            {(cleaner.services || []).map((service, index) => {
                return (


                    <FlexWrapper className="service" key={index} direction={FlexDirection.row}>
                        <h3 className="name">{service.name}</h3>
                        <h4>Price: <span className="price">{service.price}</span></h4>
                        <Button onClick={makeOrder}>Order</Button>
                    </FlexWrapper>

                );
            })}

        </>
    );

};


export default CleanerPage;