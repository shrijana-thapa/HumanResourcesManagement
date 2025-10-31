import { FormArray, FormGroup } from '@angular/forms';

export function patchFormArray(
  formArray: FormArray,
  values: any[] | null | undefined,
  createItem: () => FormGroup
) {
  formArray.clear();
  if (!values || values.length === 0) return;
  values.forEach((item) => {
    const group = createItem();
    group.patchValue(item);
    formArray.push(group);
  });
}
