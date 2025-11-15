import { ViseService } from "./vise.service";
import type { CompraRequest, Persona } from "./vise.interface";
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
        status: any;
        message: any;
        clientId?: undefined;
        name?: undefined;
        cardType?: undefined;
    };
    findAll(): Persona[];
    applyDiscount(compra: CompraRequest): {
        status: string;
        purchase: {
            clientId: number | undefined;
            originalAmount: number;
            discountApplied: number;
            finalAmount: number;
            benefit: string;
        };
        error?: undefined;
    } | {
        status: string;
        error: any;
        purchase?: undefined;
    };
}
