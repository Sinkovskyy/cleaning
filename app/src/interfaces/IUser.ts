import { AccessTypes } from "./enums/accessTypes";


export default interface IUser {
    login: string,
    type: AccessTypes
}