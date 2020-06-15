import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getHello(limit: number | null = 10): string {
    return `Returns ${limit} users`;
  }
}
