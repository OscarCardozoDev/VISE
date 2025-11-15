import './instrumentation';   // <--- muy importante

import { NestFactory } from '@nestjs/core';
import { ViseModule } from './vise.module';

async function bootstrap() {
  const app = await NestFactory.create(ViseModule);
  await app.listen(443);
  console.log('API ejecutándose en el puerto 443');
}

bootstrap();

