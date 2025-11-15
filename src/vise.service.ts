import { Injectable } from '@nestjs/common';
import type { Persona, CompraRequest } from './vise.interface';
import { Tarjeta } from './utils/tarjeta';
import { Restricciones } from './utils/restricciones';
import { Beneficios } from './utils/beneficios';

@Injectable()
export class ViseService {
  private clients: Persona[] = [];
  private currentId = 1;

  create(persona: Persona): Persona {
    const isAllowed = Restricciones.getRestricion(persona);
    if (!isAllowed) {
      throw {
        status: 'Rejected',
        message: 'Cliente no cumple con los requisitos',
      };
    }

    const cardType = Tarjeta.getCard(persona.monthlyIncome);

    const newClient: Persona = {
      ...persona,
      id: this.currentId++,
      cardType,
      status: 'Registered',
    };

    this.clients.push(newClient);
    return newClient;
  }

  findAll(): Persona[] {
    return this.clients;
  }

  applyDiscount(compra: CompraRequest) {
    const client = this.clients.find((c) => c.id === compra.clientId);
    
    if (!client) {
      return {
        error: 'Cliente no encontrado',
      };
    }

    const discount = Beneficios.getDiscount(
      client.cardType,
      compra.amount,
      compra.purchaseDate,
      compra.purchaseCountry
    );

    const finalAmount = compra.amount - discount;

    return {
      clientId: compra.clientId,
      originalAmount: compra.amount,
      discount,
      finalAmount,
      currency: compra.currency,
    };
  }
}