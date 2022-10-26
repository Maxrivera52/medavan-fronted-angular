import { FormGroup } from '@angular/forms';

export function ConfirmedValidator(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.match) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ match: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}