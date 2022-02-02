import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { configuration } from 'src/config/configuration';

import { User, UserSchema } from './schemas/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({

    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
        useFactory: (config: ConfigService) => {
            return {
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get<string | number>('JWT_EXPIRE_DATA'),
                },
            };
        },
        inject: [ConfigService],
    }),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [JwtModule, UserService]

})

export class UserModule {



}
