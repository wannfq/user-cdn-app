import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class UserService {
  constructor(private readonly connection: Connection) {}

  async createUser(user: User): Promise<void> {
    const q = this.connection.createQueryRunner();
    await q.manager.save(user);
  }

  async getUsers(
    limit: number | null = 10,
    offset: number | null = 0,
  ): Promise<ICollection<User>> {
    const q = this.connection
      .createQueryBuilder(User, 'user')
      .limit(limit)
      .offset(offset)
      .orderBy('created_at', 'DESC');
    const [data, count] = await q.getManyAndCount();
    return { count, data };
  }

  async softDeleteUser(id: number): Promise<void> {
    const q = this.connection.createQueryRunner();
    await q.manager.softDelete(User, id);
  }
}

export interface ICollection<T> {
  data: T[];
  count: number;
}
