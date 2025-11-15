import { Controller, Post, Body, Get } from '@nestjs/common';
import { ViseService } from './vise.service';
import type { CompraRequest, Persona } from './vise.interface';

@Controller()
export class ViseController {
  constructor(private viseService: ViseService) {}

  @Post('client')
  create(@Body() persona: Persona) {
    try {
      const result = this.viseService.create(persona);
      return {
        clientId: result.id,
        name: result.name,
        cardType: result.cardType,
        status: 'Registered',
        message: `Cliente apto para tarjeta ${result.cardType}`,
      };
    } catch (error: unknown) {
      const err = error as { status?: string; message?: string };
      return {
        status: err.status || 'Rejected',
        message: err.message || 'An unknown error occurred',
      };
    }
  }

  @Get()
  findAll() {
    return this.viseService.findAll();
  }

  @Post('purchase')
  applyDiscount(@Body() compra: CompraRequest) {
    return this.viseService.applyDiscount(compra);
  }
}