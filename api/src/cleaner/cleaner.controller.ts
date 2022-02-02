import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { CleanerService } from './cleaner.service';
import { IService } from './schemas/cleaner.schema';

@Controller('api/cleaner')
export class CleanerController {

    constructor(private readonly cleanerService: CleanerService) {

    }



    @Get('getAll')
    async getAll() {

        const cleaners = await this.cleanerService.getAll();

        const result = [];
        const specificFields = ['name', 'description', 'services', 'images'];

        // Filter not needed properties for app
        cleaners.forEach(element => {
            const specifiedCleaner = {};

            specificFields.forEach(field => {
                element[field] && (specifiedCleaner[field] = element[field]);
            });

            result.push(specifiedCleaner);

        });


        return result;
    }


    @Get('getCleaner/:name')
    async getCleaner(@Param() params) {

        const name = params.name;

        const cleaner = await this.cleanerService.getCleanerData({ name });

        if (!cleaner) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const result = {};
        const specificFields = ['name', 'description', 'services', 'images'];
        specificFields.forEach(field => {
            cleaner[field] && (result[field] = cleaner[field]);
        });

        return result;

    }

    @Post('create')
    async create(
        @Body('name') name: string,
        @Body('description') description: string,
        @Body('services') services: IService[] = new Array<IService>(),
        @Body('images') images: string[] = new Array<string>()
    ) {
        return this.cleanerService.create({ name, description, services, images });
    }



    @Post('remove')
    async remove(
        @Body('name') name: string
    ) {
        return this.cleanerService.remove({ name });
    }



}
