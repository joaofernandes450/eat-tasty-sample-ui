import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export class CustomValidators {
    /**
     * Email pattern validator
     */
    static email(): ValidatorFn {
        return Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    }

    /**
     * Phone number Portuguese pattern validator
     */
    static phoneNumber(): ValidatorFn {
        return Validators.pattern("^9(1|2|3|6)[0-9]{7}$")
    }

    /**
     * Autocomplete match validator
     * @param addressOptionsArray - Address options as array
     */
    static valueSelected(addressOptionsArray: any[]): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let value = c.value;
            let isValueAnAddress = addressOptionsArray.includes(value);
            if (isValueAnAddress) {
                return null;
            } else {
                return { match: true };
            }
        };
    }

    /**
     * Password and confirm password match validator
     * @param control - Angular's form AbstractControl
     */
    static passwordMatch(control: AbstractControl) {
        const password: string = control.get('password').value;
        const confirmPassword: string = control.get('confirmPassword').value;
        if (confirmPassword) {
            if (password !== confirmPassword) {
                control.get('confirmPassword').setErrors({ passwordDoNotMatch: true });
            }
        }
    }
}