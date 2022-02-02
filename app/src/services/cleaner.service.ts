import axios from 'axios';
import { OrderStatus } from '../interfaces/enums/orderStatus';
import ICleaner from '../interfaces/ICleaner';
import authService from './auth.service';


const API_URL = 'http://localhost:8080/api/';


class CleanerService {




    getALL() {
        return axios.get(API_URL + "cleaner/getAll", { withCredentials: true }).catch((error) => {


            authService.checkIfUserAuth(error);

        });
    }

    getCleaner(name: string) {
        return axios.get(API_URL + "cleaner/getCleaner/" + name, { withCredentials: true }).catch((error) => {


            authService.checkIfUserAuth(error);

        });
    }

    createCleaner(data: ICleaner) {
        return axios.post(API_URL + "cleaner/create", data, { withCredentials: true, }).catch((error) => {


            document.location.href = "/";

        });
    }


    removeCleaner(name: string) {
        return axios.post(API_URL + "cleaner/remove", { name }, { withCredentials: true, }).catch((error) => {
            authService.checkIfUserAuth(error);
        });
    }


    makeOrder(name: string, cleaner: string, price: number, status: OrderStatus) {

        return axios.post(API_URL + "order/create", { name, cleaner, price, status }, { withCredentials: true, }).catch((error) => {
            authService.checkIfUserAuth(error);
        })
    }

    updateOrder(data: any) {

        return axios.post(API_URL + "order/update", data, { withCredentials: true, }).catch((error) => {

            authService.checkIfUserAuth(error);
        })
    }


    getAllOrders() {

        return axios.get(API_URL + "order/getAll", { withCredentials: true, }).catch((error) => {
            authService.checkIfUserAuth(error);
        })
    }

    getAllOrdersBySingleUser() {

        return axios.get(API_URL + "order/getAllBySingleUser", { withCredentials: true, }).catch((error) => {
            authService.checkIfUserAuth(error);
        })
    }


    completeOrder(_id: string) {

        return axios.post(API_URL + "order/complete", { _id }, { withCredentials: true, }).catch((error) => {

            authService.checkIfUserAuth(error);
        })
    }

}


export default new CleanerService();