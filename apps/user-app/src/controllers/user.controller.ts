import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  getUsers(@Query() query: getAllQuery): string {
    return this.userService.getHello(query.limit);
  }
}

interface getAllQuery {
  limit?: number;
}
