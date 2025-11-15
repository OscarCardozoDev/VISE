export class Tarjeta {
  static getCard(monthlyIncome: number): 'Classic' | 'Gold' | 'Platinum' | 'Black' | 'White' {
    if (monthlyIncome >= 10000) return 'White';
    if (monthlyIncome >= 5000) return 'Black';
    if (monthlyIncome >= 2000) return 'Platinum';
    if (monthlyIncome >= 1000) return 'Gold';
    return 'Classic';
  }
}