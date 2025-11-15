import { ViseService } from './vise.service';
import type { CompraRequest, Persona } from './vise.interface';
export declare class ViseController {
    private viseService;
    constructor(viseService: ViseService);
    create(persona: Persona): {
        clientId: number | undefined;
        name: string;
        cardType: "Classic" | "Gold" | "Platinum" | "Black" | "White";
        status: string;
        message: string;
    } | {
        status: string;
        message: string;
        clientId?: undefined;
        name?: undefined;
        cardType?: undefined;
    };
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
