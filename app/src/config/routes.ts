import IRoute from "../interfaces/IRoute";
import { AccessTypes } from "../interfaces/enums/accessTypes";


import AuthPage from "../pages/auth";
import AdminPage from "../pages/admin";
import NotFoundPage from "../pages/notfound";
import RegistrationPage from "../pages/registration";
import AccountMainPage from "../pages/account/main"
import CleanerPage from "../pages/account/cleaner";

const routes: IRoute[] = [
    {
        path: "*",
        component: NotFoundPage,
    },
    {
        path: "/",
        component: AuthPage,
    },
    {
        path: "/login",
        component: AuthPage,
    },
    {
        path: "/registration",
        component: RegistrationPage,
    },
    {
        path: "/admin",
        component: AdminPage,
        access: AccessTypes.admin
    },
    {
        path: "/account",
        component: AccountMainPage,
        access: AccessTypes.common
    },
    {
        path: "/account/cleaner/:name",
        component: CleanerPage,
        access: AccessTypes.common
    }
];


export default routes;