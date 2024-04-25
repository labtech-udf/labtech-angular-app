
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function nameValidator(control: FormControl): { [key: string]: any } | null {
  const regex = /^[a-zA-ZÀ-ú]+(?: [a-zA-ZÀ-ú]+)*$/;
  if (regex.test(control.value)) {
    return null;
  } else {
    return { 'invalidName': true };
  }
}

export function emailValidator(control: FormControl): { [key: string]: any } | null {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (regex.test(control.value)) {
    return null; // Email válido
  } else {
    return { 'invalidEmail': true };
  }
}

export const passMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const pass = control.get('password')?.value;
  const confirm = control.get('confirm_pass')?.value;

  if (!pass || !confirm) {
    return null;
  }
  control.get('confirm_pass')?.setErrors(pass === confirm ? null : { passwordMismatch: true })
  return pass === confirm ? null : { passwordMismatch: true };
};