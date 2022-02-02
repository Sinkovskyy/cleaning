import { AccessTypes } from "./enums/accessTypes";




export default interface IRoute {
    path: string,
    component: any,
    access?: AccessTypes
};