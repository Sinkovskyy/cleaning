import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.use(cookieParser());



  app.enableCors({
    credentials: true,
    origin: 'http://localhost:3000'
  });


  await app.listen(configService.get('PORT'));
}

bootstrap();
