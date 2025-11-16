"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./instrumentation");
require("dotenv/config");
const core_1 = require("@nestjs/core");
const vise_module_1 = require("./vise.module");
const api_1 = require("@opentelemetry/api");
const tracer = api_1.trace.getTracer('vise-api');
async function bootstrap() {
    try {
        const bootstrapSpan = tracer.startSpan('app_bootstrap');
        await api_1.context.with(api_1.trace.setSpan(api_1.context.active(), bootstrapSpan), async () => {
            const app = await core_1.NestFactory.create(vise_module_1.ViseModule);
            const port = process.env.PORT || 443;
            await app.listen(port);
            console.log(`✅ Application is running on port: ${port}`);
            console.log(`🔍 OpenTelemetry tracing active - sending data to Axiom`);
            bootstrapSpan.addEvent('server_started', {
                port: port.toString(),
                environment: process.env.NODE_ENV || 'production',
            });
            bootstrapSpan.end();
        });
    }
    catch (error) {
        const errorSpan = tracer.startSpan('app_bootstrap_error');
        errorSpan.recordException(error);
        errorSpan.end();
        console.error('❌ Failed to bootstrap application:', error);
        process.exit(1);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map