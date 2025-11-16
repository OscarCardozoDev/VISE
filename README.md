>Equipo:
Pablo Nicolas Aguilar Chinome
Oscar Javier Cardozo Diaz
Eliana Yesmid Reyes Cardenas
Manuel Alexis Silva Ruiz


Ruta: localhost:3000

Ruta Post: localhost:3000/client
Ruta Get: localhost:3000/client
Ruta Post 2: localhost:3000/client/purchase

Se cambiaron las respuestas HTTP 200 a HTTP 201 para que la prueba pueda aceptar el codigo.

/--------------------------/
>Tecnologías Utilizadas:
Framework: NestJS v11.0.1
Runtime: Node.js
Lenguaje: TypeScript 5.7.3
Observabilidad: OpenTelemetry+Axiom
Containerización: Docker

/--------------------------/
>Dependencias:
@nestjs/common v11.0.17
@nestjs/core v11.0.1
@nestjs/platform-express v11.0.1
@opentelemetry/sdk-node v0.206.0
@opentelemetry/auto-instrumentations-node v0.65.0
@opentelemetry/exporter-trace-otlp-proto v0.208.0
dotenv v17.2.3
reflect-metadata v0.2.2
rxjs v7.8.1

/--------------------------/
>Instalación:

1. Clonar el repositorio
git clone <url-del-repositorio>
cd VISE

2. Instalar dependencias
npm install

3. Configurar variables de entorno, archivo .env
# Axiom Configuration
AXIOM_DOMAIN=api.axiom.co
AXIOM_API_TOKEN=tu_token_de_axiom_aqui
AXIOM_DATASET=nombre_de_tu_dataset

PORT=443                      # Puerto en el que correrá la aplicación
NODE_ENV=production           # Ambiente: development, production, staging
SERVICE-NAME=vise-api         # Nombre del servicio en Axiom

4. Cosntruir el proyecto
npm run build

/--------------------------/
>Ejecución:
npm run start:dev             # Modo Desarrollo
npm run start:prod            # Modo Producción
npm run start:debug           # Modo Debug

/--------------------------/
>Docker

1. Crear imagen
docker build -t vise .

2. Ejecutar contenedor
docker run -p 3000:3000 vise