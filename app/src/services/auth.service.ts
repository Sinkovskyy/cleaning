import axios from "axios";




const API_URL = 'http://localhost:8080/api/user/';


class AuthService {

    // Check if user auth and redirect if not
    checkIfUserAuth = (error: any): void => {

        if (error.response.status === 401) {
            this.logout();

        }
        document.location.href = "/";
    }




    login(login: string, password: string) {
        return axios.post(API_URL + "login", { login, password }, { withCredentials: true }).then(response => {
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));

                return response.data;
            }
        });
    }


    logout() {
        localStorage.removeItem("user");
        return axios.post(API_URL + "logout", { withCredentials: true });

    }


    register(login: string, password: string, name: string, wallet: number) {
        return axios.post(API_URL + "create", { login, name, password, wallet });
    }


    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user') as string);
    }


    getCurrentUserWallet() {
        return axios.get(API_URL + 'wallet', { withCredentials: true }).catch(error => {
            this.checkIfUserAuth(error)
        });
    }




}


export default new AuthService();