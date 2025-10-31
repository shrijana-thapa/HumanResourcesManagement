import { AbstractControl, FormArray, ValidationErrors } from '@angular/forms';

export class AmountValidator {
  private static intervalOrder: Record<
    'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly',
    number
  > = {
    daily: 1,
    weekly: 2,
    monthly: 3,
    quarterly: 4,
    yearly: 5,
  };

  static amountHierarchyValidator(control: AbstractControl): ValidationErrors | null {
    if (!(control instanceof FormArray)) return null;
    const incomesControls = control.controls;

    // Clear previous errors on all children first
    incomesControls.forEach((fg) => {
      fg.get('amount')?.setErrors(null);
    });

    for (let i = 0; i < incomesControls.length; i++) {
      const firstControl = incomesControls[i];
      const firstInterval = firstControl.get('interval')?.value.toLowerCase();
      const firstAmount = firstControl.get('amount')?.value;
      if (!firstInterval || firstAmount == null) continue;

      for (let j = i + 1; j < incomesControls.length; j++) {
        // if (i === j) continue;
        const secondControl = incomesControls[j];
        const secondInterval = secondControl.get('interval')?.value?.toLowerCase();
        const secondAmount = secondControl.get('amount')?.value;
        if (!secondInterval || secondAmount == null) continue;

        const firstOrder =
          AmountValidator.intervalOrder[
            firstInterval as keyof typeof AmountValidator.intervalOrder
          ];
        const secondOrder =
          AmountValidator.intervalOrder[
            secondInterval as keyof typeof AmountValidator.intervalOrder
          ];
        if (secondOrder > firstOrder && Number(secondAmount) <= Number(firstAmount)) {
          secondControl.get('amount')?.setErrors({
            invalidIncomeHierarchy: `${secondInterval} amount (${secondAmount}) should be greater than ${firstInterval} amount (${firstAmount}).`,
          });
        }

        if (secondOrder < firstOrder && Number(secondAmount) >= Number(firstAmount)) {
          secondControl.get('amount')?.setErrors({
            invalidIncomeHierarchy: `${secondInterval} amount (${secondAmount}) should be less than ${firstInterval} amount (${firstAmount}).`,
          });
        }
      }
    }
    return null;
  }
}
