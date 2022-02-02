import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cleaner, CleanerDocument } from './schemas/cleaner.schema';

@Injectable()
export class CleanerService {


    constructor(@InjectModel(Cleaner.name) private cleanerModel: Model<CleanerDocument>) {

    }


    async getAll(): Promise<Cleaner[]> {
        return this.cleanerModel.find().exec();
    }



    async getCleanerData(data: any): Promise<Cleaner> {
        return this.cleanerModel.findOne(data);
    }


    async create(data: any): Promise<Cleaner> {
        const newCleaner = new this.cleanerModel(data);
        return newCleaner.save();
    }


    async remove(data: any) {
        return this.cleanerModel.remove(data);
    }



}
