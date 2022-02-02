import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
    pending = "pending",
    completed = "completed",
    return = "return",
    ready = "ready"
};

@Schema()
export class Order {

    @Prop({
        required: true,
    })
    name: string;

    @Prop({
        required: true,
    })
    login: string;

    @Prop({
        required: true,
    })
    userName: string;

    @Prop({
        required: true,
    })
    cleaner: string;


    @Prop({
        required: true,
    })
    price: number;

    @Prop({
        required: true,
    })
    status: OrderStatus;


    @Prop({
        required: true,
    })
    date: Date;


    @Prop()
    message: string

}



export const OrderSchema = SchemaFactory.createForClass(Order);


