
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { UserRights } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { Types } from 'mongoose';

@Injectable()
export class AdminAuthMiddleware implements NestMiddleware {



  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {

  }


  async use(request: Request, response: Response, next: () => void) {

    try {
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        return response.status(HttpStatus.UNAUTHORIZED).send({ message: "Cookie error" });
      }

      const user = await this.userService.findUser({ '_id': new Types.ObjectId(data['id']) });

      if (!user)
        return response.status(HttpStatus.UNAUTHORIZED).send({ message: "User not error" });


      if (user.type != UserRights.admin) {
        return response.status(HttpStatus.UNAUTHORIZED).send({ message: "Permission denied" });
      }

      next();

    }
    catch (e) {
      return response.status(HttpStatus.UNAUTHORIZED).send({ message: e });
    }


  }
}
