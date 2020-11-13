import { FormControl, ValidationErrors } from '@angular/forms';

export class ShopValidators {
    // white space validation
    static notOnlyWhitespace(control: FormControl): ValidationErrors{

        // check if the string only has white spaces
        if((control.value != null) && (control.value.trim().length === 0) ){
            //invalid, return error object
            return { 'notOnlyWhitespace': true};
        } else{

            return null;
        }
    }
}
