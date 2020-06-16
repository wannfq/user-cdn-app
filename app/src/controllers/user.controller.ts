import {
  Controller,
  Get,
  Post,
  Query,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('health')
  health(): any {
    return {
      message: 'OK',
    };
  }

  @Get('user')
  async getUsers(@Query() query: IGetUsersQueryParam): Promise<IResponse> {
    try {
      const offset =
        query.page && query.perPage
          ? (query.page - 1) * query.perPage
          : undefined;
      return {
        message: 'OK',
        ...(await this.userService.getUsers(query.perPage, offset)),
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  @Post('user')
  async createUser(@Body() body: ICreateUserBodyParam): Promise<IResponse> {
    try {
      const user = new User();
      user.email = body.email;
      user.username = body.username;
      user.phone = body.phone || null;
      user.skillsets = body.skillsets || null;
      user.hobby = body.hobby || null;
      await this.userService.createUser(user);
      return {
        message: 'OK',
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  @Post('user/:id')
  async updateUser(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() body: ICreateUserBodyParam,
  ): Promise<IResponse> {
    try {
      const user = new User();
      user.email = body.email;
      user.username = body.username;
      user.phone = body.phone || null;
      user.skillsets = body.skillsets || null;
      user.hobby = body.hobby || null;
      await this.userService.createUser(user);
      return {
        message: 'OK',
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  @Post('user/dummy')
  async createDummyUser(): Promise<IResponse> {
    try {
      const user = new User();
      user.email = 'dummy.email@domain.com';
      user.username = 'dummy-username';
      user.phone = '1118080808';
      await this.userService.createUser(user);
      return {
        message: 'OK',
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }

  @Delete('user/:id')
  async deleteUser(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<IResponse> {
    try {
      await this.userService.softDeleteUser(id);
      return {
        message: 'OK',
      };
    } catch (e) {
      return {
        error: e.message,
      };
    }
  }
}

export interface IGetUsersQueryParam {
  page?: number;
  perPage?: number;
}

export interface ICreateUserBodyParam {
  email: string;
  username: string;
  phone: string;
  skillsets?: string;
  hobby?: string;
}

export interface IResponse {
  message?: string;
  data?: any;
  error?: string;
  count?: number;
}
