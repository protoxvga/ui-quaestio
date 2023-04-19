import { FormGroup } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const checkControl = formGroup.controls[checkControlName];

      //chcek if in the confirm password (checkControl) there is any error, in that case return null, so can fix first other error.
      if (checkControl?.errors && !checkControl.errors['matching'])
        return null;

      //check if both passwords are equal
      if (control?.value !== checkControl?.value) {
        //if passwords not equal we set matching erro to true
        checkControl?.setErrors({ matching: true });
        return { matching: true };
      } else {
        //if paswords are equal set errors to null
        checkControl?.setErrors(null);
        return null;
      }
    };
  }
}