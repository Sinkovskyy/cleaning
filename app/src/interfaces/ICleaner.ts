import IService from "./IService";

export default interface ICleaner {
    name: string;
    description: string;
    services: IService[];
    images: string[];
    editing?: boolean

}