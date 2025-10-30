import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nepalicurrencypipe',
  standalone: true,
})
export class NepaliCurrencyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value === null || value === undefined) return '';
    let amount = typeof value === 'string' ? Number(value.trim()) : value;
    if (isNaN(amount)) return '';
    const isNegative = amount < 0;
    amount = Math.abs(amount);
    let [intPart, decPart] = amount.toFixed(2).split('.');
    let lastThree = intPart.slice(-3);
    let otherNumbers = intPart.slice(0, -3);
    if (otherNumbers !== '') {
      lastThree = ',' + lastThree;
      otherNumbers = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    }
    let formatted = otherNumbers + lastThree;

    return (isNegative ? '- ' : '') + 'रू ' + formatted + '.' + decPart;
  }
}
