"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Restricciones = void 0;
class Restricciones {
    static getRestricion(person) {
        const notAllowCountries = ['Cuba', 'Korea'];
        if (notAllowCountries.includes(person.country)) {
            return false;
        }
        if (person.monthlyIncome < 100) {
            return false;
        }
        return true;
    }
}
exports.Restricciones = Restricciones;
//# sourceMappingURL=restricciones.js.map