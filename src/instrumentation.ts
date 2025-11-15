
/* instrumentation.ts */

import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';

const traceExporter = new OTLPTraceExporter({
  url: `https://${process.env.AXIOM_DOMAIN}/v1/traces`,
  headers: {
    Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
    'X-Axiom-Dataset': process.env.AXIOM_DATASET || '',
  },
});

const sdk = new NodeSDK({
  spanProcessor: new BatchSpanProcessor(traceExporter),
  instrumentations: [getNodeAutoInstrumentations()],
  serviceName: process.env.OTEL_SERVICE_NAME || 'vise-service',
});

sdk.start();
console.log('✔ OpenTelemetry iniciado');