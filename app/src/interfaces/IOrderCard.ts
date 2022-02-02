import IOrder from "./IOrder";

export default interface IOrderCard {
    order: IOrder;
    ordersList: IOrder[];
    setOrdersList: React.Dispatch<React.SetStateAction<IOrder[]>>;

}