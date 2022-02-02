import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { FlexDirection } from "../interfaces/enums/flexDirection";
import { OrderStatus } from "../interfaces/enums/orderStatus";
import IOrder from "../interfaces/IOrder";
import IOrderCard from "../interfaces/IOrderCard";
import cleanerService from "../services/cleaner.service";
import { FlexWrapper } from "./styled/flexWrapper";






const OrderCard: React.FC<IOrderCard> = ({ order, ordersList, setOrdersList }) => {


    const editOrder = (e: React.SyntheticEvent) => {
        const card = (e.target as HTMLElement).closest('.card') as HTMLElement;
        const _id = card.getAttribute("id") as string;





        setOrdersList(ordersList.map(element => {

            if (element._id === _id) {
                element.editing = true;
            }

            return element;
        }));


    }

    return (
        <>

            <ListGroup.Item as="li" className="card" id={order._id}>


                <FlexWrapper direction={FlexDirection.row}>
                    <h4>{order.name}</h4>
                    <h4>Price: {order.price}</h4>
                    <h4>{order.userName}</h4>
                    <h4>{order.cleaner}</h4>
                    <h4>{new Date(order.date).toISOString().slice(0, 10)}</h4>
                    <h4>{order.status == OrderStatus.pending ? OrderStatus.new : order.status}</h4>
                    {order.status === OrderStatus.return && <h4>{order.message}</h4>}

                    {order.status !== OrderStatus.return && order.status !== OrderStatus.completed && <Button className="editButton" onClick={editOrder}>Edit</Button>}

                </FlexWrapper>
            </ListGroup.Item >

        </>

    )
};



const EditingOrderCard: React.FC<IOrderCard> = ({ order, ordersList, setOrdersList }) => {



    const [status, setStatus] = useState<OrderStatus>(order.status as OrderStatus);


    const getStatuses = () => {

        const statuses = [];
        for (const status in OrderStatus) {
            statuses.push(status);
        }

        return statuses;

    }

    const saveOrder = async (e: React.SyntheticEvent) => {
        const card = (e.target as HTMLElement).closest('.card') as HTMLElement;
        const _id = card.getAttribute("id") as string;


        const name = (card.querySelector('.name') as HTMLInputElement).value as string;
        const price = +((card.querySelector('.price') as HTMLInputElement).value) as number;
        const userName = (card.querySelector('.userName') as HTMLInputElement).value as string;
        const cleaner = (card.querySelector('.cleaner') as HTMLInputElement).value as string;

        let date = (card.querySelector('.date') as HTMLInputElement).value as string || order.date;
        date = new Date(date);

        const status = (card.querySelector('.status') as HTMLSelectElement).value as string;
        const message = (card.querySelector('.message') as HTMLSelectElement)?.value as string;


        let data = message ? { _id, name, price, userName, status, date, cleaner, message } : { _id, name, price, userName, status, date, cleaner };

        await cleanerService.updateOrder(data);



        setOrdersList(ordersList.map(element => {

            if (element._id == _id) {

                element.name = name;
                element.price = price;
                element.userName = userName;
                element.status = status;
                element.date = date as Date;
                element.editing = false;

            }
            return element;
        }));





    }




    return (
        <>

            <ListGroup.Item as="li" className="card" id={order._id}>


                <FlexWrapper direction={FlexDirection.row}>
                    <input type="text" className="name" defaultValue={order.name} />
                    <input type="number" className="price" defaultValue={order.price} />
                    <input type="text" className="userName" defaultValue={order.userName} />
                    <input type="text" className="cleaner" defaultValue={order.cleaner} />
                    <input type="datetime-local" className="date" defaultValue={new Date(order.date).toDateString()} />
                    <select className="status" defaultValue={status} onChange={(e: React.SyntheticEvent) => {
                        setStatus((e.target as HTMLSelectElement).value as OrderStatus);
                    }}>
                        {
                            getStatuses().map((status, index) => {

                                let statusValue = status;

                                if (statusValue === OrderStatus.pending) {
                                    statusValue = OrderStatus.new;
                                }


                                if (status === OrderStatus.new || status === OrderStatus.completed) {
                                    return;
                                }

                                return (



                                    <option key={index} value={status}  >{statusValue}</option>



                                );
                            })


                        }
                    </select>

                    {(status === OrderStatus.return) && <textarea className="message"></textarea>}

                    <Button className="editButton" onClick={saveOrder}>Save</Button>

                </FlexWrapper>
            </ListGroup.Item >

        </>

    )
};


const AdminOrdersList: React.FC = () => {

    const [ordersList, setOrdersList] = useState<IOrder[]>([]);


    useEffect(() => {

        // Retrieve cleaners from db
        if (!ordersList.length) {

            cleanerService.getAllOrders().then(response => {
                if (response && response.data.length) {
                    setOrdersList(response.data);
                }
            });

        }


    });

    return (
        <>
            <h1>Orders List</h1>
            <ListGroup as="ol" numbered>

                {ordersList.map((order, index) => {
                    return (


                        <div key={index}>
                            {order.editing ? <EditingOrderCard order={order} ordersList={ordersList} setOrdersList={setOrdersList} />
                                : <OrderCard order={order} ordersList={ordersList} setOrdersList={setOrdersList} />}


                        </div>);



                })}


            </ListGroup>
        </>
    );
};





export default AdminOrdersList;