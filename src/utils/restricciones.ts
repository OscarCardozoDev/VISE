import type { Persona } from '../vise.interface';

export class Restricciones {
  static getRestricion(person: Persona): boolean {
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