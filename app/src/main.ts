import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = (await NestFactory.create(AppModule)) as NestExpressApplication;

  app.useStaticAssets(join(__dirname, '../../', 'dist/frontend'));

  await app.listen(8000);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
