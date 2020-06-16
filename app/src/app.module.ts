import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { User } from './entities';
import { ConfigModule } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [
    {
      provide: 'POSTGRES_CONNECTION',
      useFactory: async (): Promise<Connection> =>
        await createConnection({
          type: 'postgres',
          url: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false },
          entities: [User],
          synchronize: true,
        }),
    },
    {
      provide: UserService,
      inject: ['POSTGRES_CONNECTION'],
      useFactory: (connection: Connection): UserService =>
        new UserService(connection),
    },
  ],
})
export class AppModule {}
