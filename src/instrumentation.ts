/*instrumentation.ts*/

// Importing necessary OpenTelemetry packages including the core SDK, auto-instrumentations, OTLP trace exporter, and batch span processor
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
const { Resource } = require('@opentelemetry/resources');
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

// Initialize OTLP trace exporter with the endpoint URL and headers
const traceExporter = new OTLPTraceExporter({
  url: 'https://AXIOM_DOMAIN/v1/traces',
  headers: {
    'Authorization': `Bearer ${process.env.AXIOM_TOKEN!}`,
    'X-Axiom-Dataset': process.env.AXIOM_DATASET!
  },
});

// Creating a resource to identify your service in traces
const resource = new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: 'node traces',
});

// Configuring the OpenTelemetry Node SDK
const sdk = new NodeSDK({
  // Adding a BatchSpanProcessor to batch and send traces
  spanProcessor: new BatchSpanProcessor(traceExporter),

  // Registering the resource to the SDK
  resource: resource,

  // Adding auto-instrumentations to automatically collect trace data
  instrumentations: [getNodeAutoInstrumentations()],
});

// Starting the OpenTelemetry SDK to begin collecting telemetry data
sdk.start();