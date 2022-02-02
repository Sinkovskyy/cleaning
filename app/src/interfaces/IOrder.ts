import { OrderStatus } from "./enums/orderStatus";

export default interface IOrder {
    _id: string,
    name: string,
    userName: string,
    login: string,
    date: Date,
    cleaner: string,
    price: number,
    status: OrderStatus | string,
    message: string,
    editing?: boolean
};