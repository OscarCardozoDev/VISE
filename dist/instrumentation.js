"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_trace_otlp_proto_1 = require("@opentelemetry/exporter-trace-otlp-proto");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const traceExporter = new exporter_trace_otlp_proto_1.OTLPTraceExporter({
    url: `https://${process.env.AXIOM_DOMAIN}/v1/traces`,
    headers: {
        Authorization: `Bearer ${process.env.AXIOM_TOKEN}`,
        'X-Axiom-Dataset': process.env.AXIOM_DATASET || '',
    },
});
const sdk = new sdk_node_1.NodeSDK({
    spanProcessor: new sdk_trace_base_1.BatchSpanProcessor(traceExporter),
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
    serviceName: process.env.OTEL_SERVICE_NAME || 'vise-service',
});
sdk.start();
console.log('✔ OpenTelemetry iniciado');
//# sourceMappingURL=instrumentation.js.map