import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

export type UserDocument = User & Document;

export enum UserRights {
    admin = "admin",
    common = "common"
}


@Schema()
export class User {

    @Prop({
        required: true,
        unique: true
    })
    login: string;


    @Prop()
    name: string


    @Prop({
        required: true,
    })
    password: string

    @Prop({
        required: true,
    })
    type: UserRights


    @Prop()
    wallet: number

}



export const UserSchema = SchemaFactory.createForClass(User);


