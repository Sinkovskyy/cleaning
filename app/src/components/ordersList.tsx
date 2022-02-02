import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FlexDirection } from "../interfaces/enums/flexDirection";
import { OrderStatus } from "../interfaces/enums/orderStatus";
import IOrder from "../interfaces/IOrder";
import cleanerService from "../services/cleaner.service";
import { FlexWrapper } from "./styled/flexWrapper";




const OrdersList: React.FC = () => {

    const [ordersList, setOrdersList] = useState<IOrder[]>([]);


    useEffect(() => {

        // Retrieve cleaners from db
        if (!ordersList.length) {

            cleanerService.getAllOrdersBySingleUser().then(response => {
                if (response && response.data.length) {
                    setOrdersList(response.data);
                }
            });

        }


    });

    const completeOrder = async (e: React.SyntheticEvent) => {
        const card = (e.target as HTMLElement).closest(".orderCard") as HTMLElement;
        const id = card.getAttribute("id") as string;

        await cleanerService.completeOrder(id);

        document.location.reload();

    }

    return (
        <>
            <h1>Orders List</h1>
            <ListGroup as="ol" numbered>

                {ordersList.map((order, index) => {
                    return (


                        <ListGroup.Item key={index} as="li" className="orderCard" id={order._id}>
                            <FlexWrapper direction={FlexDirection.row}>

                                <h4>{order.name}</h4>
                                <h4>Price: {order.price}</h4>
                                <h4>{order.date}</h4>
                                <h4>{order.cleaner}</h4>
                                <h4>{order.status}</h4>
                                {order.status === OrderStatus.ready && <Button onClick={completeOrder}>Complete</Button>}
                                {order.status === OrderStatus.return && <h4>{order.message}</h4>}

                            </FlexWrapper>

                        </ListGroup.Item>


                    );
                })}


            </ListGroup>
        </>
    );
};





export default OrdersList;