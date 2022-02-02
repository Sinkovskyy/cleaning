import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { CleanerModule } from './cleaner/cleaner.module';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { AdminAuthMiddleware } from './middlewares/admin-auth.middleware';
import { OrderModule } from './order/order.module';
import { HttpModule } from '@nestjs/axios';




@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    UserModule,
    CleanerModule,
    MongooseModule.forRoot(`mongodb+srv://${configuration().db_login}:${configuration().db_password}@cluster0.aklqu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`),
    OrderModule,
    HttpModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {


  configure(consumer: MiddlewareConsumer) {

    consumer.apply(AdminAuthMiddleware).forRoutes(
      { path: '/api/cleaner/create', method: RequestMethod.POST },
      { path: '/api/cleaner/remove', method: RequestMethod.POST },


      { path: '/api/order/update', method: RequestMethod.POST },
      { path: '/api/order/getAll', method: RequestMethod.GET }

    );
    consumer.apply(AuthMiddleware).forRoutes(
      { path: '/api/cleaner/getAll', method: RequestMethod.GET },
      { path: '/api/cleaner/getCleaner/:name', method: RequestMethod.GET },


      { path: '/api/user/wallet', method: RequestMethod.GET },



      { path: '/api/order/create', method: RequestMethod.POST },
      { path: '/api/order/getAllBySingleUser', method: RequestMethod.GET },
      { path: '/api/order/complete', method: RequestMethod.POST }


    );

  }


}
