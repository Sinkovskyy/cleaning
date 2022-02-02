import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { required } from "joi";

import { Document } from 'mongoose';

export type CleanerDocument = Cleaner & Document;

export interface IService {
    name: string;
    price: number;
}


@Schema()
export class Cleaner {

    @Prop({ required: true, unique: true })
    name: string

    @Prop({ required: true })
    description: string


    @Prop({ required: true })
    services: IService[]

    @Prop({ required: true })
    images: string[]
}



export const CleanerSchema = SchemaFactory.createForClass(Cleaner);


