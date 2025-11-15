import type { Persona } from '../vise.interface';

export class Beneficios {
  static getDiscount(
    cardType: string,
    payment: number,
    day?: string,
    countryRecidence?: string
  ): number {
    const allowDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const notAllowCountries = ['Cuba', 'Korea'];

    // Validar que day y countryRecidence no sean undefined antes de usarlos
    if (cardType === 'Classic') {
      if (day && allowDays.includes(day) && payment >= 100) {
        return payment * 0.05;
      }
      return 0;
    }

    if (cardType === 'Gold') {
      if (
        day &&
        countryRecidence &&
        allowDays.includes(day) &&
        payment >= 100 &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        return payment * 0.1;
      }
      if (day && allowDays.includes(day) && payment >= 100) {
        return payment * 0.05;
      }
      return 0;
    }

    if (cardType === 'Platinum') {
      if (
        day &&
        countryRecidence &&
        allowDays.includes(day) &&
        payment >= 100 &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        return payment * 0.15;
      }
      if (day && allowDays.includes(day) && payment >= 100) {
        return payment * 0.1;
      }
      return 0;
    }

    if (cardType === 'Black') {
      if (
        day &&
        countryRecidence &&
        allowDays.includes(day) &&
        payment >= 100 &&
        !notAllowCountries.includes(countryRecidence)
      ) {
        return payment * 0.2;
      }
      return 0;
    }

    if (cardType === 'White') {
      if (day && weekDays.includes(day) && payment >= 100) {
        return payment * 0.25;
      }
      return 0;
    }

    return 0;
  }
}