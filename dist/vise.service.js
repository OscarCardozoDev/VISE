"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViseService = void 0;
const common_1 = require("@nestjs/common");
const tarjeta_1 = require("./utils/tarjeta");
const restricciones_1 = require("./utils/restricciones");
const beneficios_1 = require("./utils/beneficios");
let ViseService = class ViseService {
    constructor() {
        this.clients = [];
        this.currentId = 1;
    }
    create(persona) {
        const isAllowed = restricciones_1.Restricciones.getRestricion(persona);
        if (!isAllowed) {
            throw {
                status: 'Rejected',
                message: 'Cliente no cumple con los requisitos',
            };
        }
        const cardType = tarjeta_1.Tarjeta.getCard(persona.monthlyIncome);
        const newClient = Object.assign(Object.assign({}, persona), { id: this.currentId++, cardType, status: 'Registered' });
        this.clients.push(newClient);
        return newClient;
    }
    findAll() {
        return this.clients;
    }
    applyDiscount(compra) {
        const client = this.clients.find((c) => c.id === compra.clientId);
        if (!client) {
            return {
                error: 'Cliente no encontrado',
            };
        }
        const discount = beneficios_1.Beneficios.getDiscount(client.cardType, compra.amount, compra.purchaseDate, compra.purchaseCountry);
        const finalAmount = compra.amount - discount;
        return {
            clientId: compra.clientId,
            originalAmount: compra.amount,
            discount,
            finalAmount,
            currency: compra.currency,
        };
    }
};
exports.ViseService = ViseService;
exports.ViseService = ViseService = __decorate([
    (0, common_1.Injectable)()
], ViseService);
//# sourceMappingURL=vise.service.js.map