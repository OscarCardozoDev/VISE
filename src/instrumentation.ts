import 'dotenv/config';

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

// Validate required environment variables
if (!process.env.AXIOM_API_TOKEN) {
  throw new Error('AXIOM_API_TOKEN environment variable is required');
}
if (!process.env.AXIOM_DATASET) {
  throw new Error('AXIOM_DATASET environment variable is required');
}

const axiomDomain = process.env.AXIOM_DOMAIN || 'api.axiom.co';

// Initialize OTLP trace exporter with Axiom endpoint
const traceExporter = new OTLPTraceExporter({
  url: `https://${axiomDomain}/v1/traces`,
  headers: {
    'Authorization': `Bearer ${process.env.AXIOM_API_TOKEN}`,
    'X-Axiom-Dataset': process.env.AXIOM_DATASET
  },
});

// Configuring the OpenTelemetry Node SDK
const sdk = new NodeSDK({
  spanProcessor: new BatchSpanProcessor(traceExporter),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: process.env.SERVICE_NAME || 'vise-api',
});

// Starting the OpenTelemetry SDK
sdk.start();
console.log('OpenTelemetry instrumentation started with Axiom');

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('Tracing terminated'))
    .catch((error) => console.log('Error terminating tracing', error))
    .finally(() => process.exit(0));
});

export default sdk;