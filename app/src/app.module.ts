import { Module } from '@nestjs/common';
import { UserController } from './controllers';
import { UserService } from './services';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
