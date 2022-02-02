import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CleanerController } from './cleaner.controller';
import { CleanerService } from './cleaner.service';
import { Cleaner, CleanerSchema } from './schemas/cleaner.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cleaner.name, schema: CleanerSchema }])],
  controllers: [CleanerController],
  providers: [CleanerService]
})
export class CleanerModule {



}
