import type { Persona, CompraRequest } from './vise.interface';
export declare class ViseService {
    private clients;
    private currentId;
    create(persona: Persona): Persona;
    findAll(): Persona[];
    applyDiscount(compra: CompraRequest): {
        error: string;
        clientId?: undefined;
        originalAmount?: undefined;
        discount?: undefined;
        finalAmount?: undefined;
        currency?: undefined;
    } | {
        clientId: number;
        originalAmount: number;
        discount: number;
        finalAmount: number;
        currency: string;
        error?: undefined;
    };
}
