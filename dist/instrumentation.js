"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_node_1 = require("@opentelemetry/sdk-node");
const auto_instrumentations_node_1 = require("@opentelemetry/auto-instrumentations-node");
const exporter_trace_otlp_proto_1 = require("@opentelemetry/exporter-trace-otlp-proto");
const sdk_trace_base_1 = require("@opentelemetry/sdk-trace-base");
const { Resource } = require('@opentelemetry/resources');
const semantic_conventions_1 = require("@opentelemetry/semantic-conventions");
const traceExporter = new exporter_trace_otlp_proto_1.OTLPTraceExporter({
    url: 'https://AXIOM_DOMAIN/v1/traces',
    headers: {
        'Authorization': `Bearer ${process.env.AXIOM_TOKEN}`,
        'X-Axiom-Dataset': process.env.AXIOM_DATASET
    },
});
const resource = new Resource({
    [semantic_conventions_1.SemanticResourceAttributes.SERVICE_NAME]: 'node traces',
});
const sdk = new sdk_node_1.NodeSDK({
    spanProcessor: new sdk_trace_base_1.BatchSpanProcessor(traceExporter),
    resource: resource,
    instrumentations: [(0, auto_instrumentations_node_1.getNodeAutoInstrumentations)()],
});
sdk.start();
//# sourceMappingURL=instrumentation.js.map