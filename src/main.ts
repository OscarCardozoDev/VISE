import 'dotenv/config';
import { NestFactory } from "@nestjs/core";
import { ViseModule } from "./vise.module";
//import './instrumentation';
import * as appInsights from "applicationinsights";

console.log("AI Connection String:", process.env.APPLICATIONINSIGHTS_CONNECTION_STRING);

// Initialize using the connection string injected by Azure
appInsights
 .setup(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING)
 .setAutoDependencyCorrelation(true)
 .setAutoCollectRequests(true)
 .setAutoCollectPerformance(true, {})
 .setAutoCollectExceptions(true)
 .setAutoCollectDependencies(true)
 .setAutoCollectConsole(true, true)
 .setUseDiskRetryCaching(true)
 .start();
const client = appInsights.defaultClient;
client.context.tags[client.context.keys.cloudRole] = "my-node-api"; // Optional: tag role
// Example custom event
client.trackEvent({ name: "server_started", properties: { environment:
"production" } });

async function bootstrap() {
  const app = await NestFactory.create(ViseModule);
  await app.listen(443);
}
bootstrap();
