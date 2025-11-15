import './instrumentation';
import { NestFactory } from "@nestjs/core";
import { ViseModule } from "./vise.module";
//Section about Axom
// Importing OpenTelemetry instrumentation for tracing

import { trace, context } from '@opentelemetry/api';

// Importing Express.js: A minimal and flexible Node.js web app framework
import express from 'express';
//Closed section

async function bootstrap() {
  const app = await NestFactory.create(ViseModule);
  await app.listen(443);
}
bootstrap();
