import './instrumentation';

import 'dotenv/config';
import { NestFactory } from "@nestjs/core";
import { ViseModule } from "./vise.module";
import { trace, context } from '@opentelemetry/api';

// Get the tracer from the global tracer provider
const tracer = trace.getTracer('vise-api');

async function bootstrap() {
  try {
    // Crear una span para el inicio de la aplicación
    const bootstrapSpan = tracer.startSpan('app_bootstrap');
    
    await context.with(trace.setSpan(context.active(), bootstrapSpan), async () => {
      const app = await NestFactory.create(ViseModule);
      
      // Opcional: Habilitar CORS si lo necesitas
      // app.enableCors();
      
      const port = process.env.PORT || 443;
      await app.listen(port);
      
      console.log(`✅ Application is running on port: ${port}`);
      console.log(`🔍 OpenTelemetry tracing active - sending data to Axiom`);
      
      // Track custom event for app startup
      bootstrapSpan.addEvent('server_started', {
        port: port.toString(),
        environment: process.env.NODE_ENV || 'production',
      });
      
      bootstrapSpan.end();
    });
  } catch (error) {
    // Crear una span para errores de bootstrap
    const errorSpan = tracer.startSpan('app_bootstrap_error');
    errorSpan.recordException(error as Error);
    errorSpan.end();
    
    console.error('❌ Failed to bootstrap application:', error);
    process.exit(1);
  }
}

bootstrap();