import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export const PasswordConfirmValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const password_confirm = control.get('password_confirm');
  return password_confirm && (password.value != password_confirm.value) ? { unmatch: true } : null;
};
