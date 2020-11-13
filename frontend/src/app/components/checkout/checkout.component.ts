import { Component, OnInit } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import { Country } from "src/app/common/country";
import { State } from "src/app/common/state";
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { ShopFormService } from "src/app/services/shop-form.service";
import { ShopValidators } from 'src/app/validators/shop-validators';

@Component({
    selector: "app-checkout",
    templateUrl: "./checkout.component.html",
    styleUrls: ["./checkout.component.css"],
})
export class CheckoutComponent implements OnInit {
    checkoutFormGroup: FormGroup;

    totalPrice: number = 0;
    totalQuantity: number = 0;
    creditCardYears: number[] = [];
    creditCardMonths: number[] = [];

    countries: Country[] = [];
    states: State[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private shopFormService: ShopFormService,
        private cartService: CartService
    ) {}

    ngOnInit(): void {
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: new FormControl("", [
                    Validators.required,
                    Validators.minLength(2),
                    ShopValidators.notOnlyWhitespace 
                ]),
                lastName: new FormControl("", [
                    Validators.required,
                    Validators.minLength(2),
                ]),
                email: new FormControl("", [
                    Validators.required,
                    Validators.pattern(
                        "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
                    ),
                ]),
            }),
            shippingAddress: this.formBuilder.group({
                street: [""],
                city: [""],
                state: [""],
                country: [""],
                zipCode: [""],
            }),
            billingAddress: this.formBuilder.group({
                street: [""],
                city: [""],
                state: [""],
                country: [""],
                zipCode: [""],
            }),
            creditCard: this.formBuilder.group({
                cardType: [""],
                nameOnCard: [""],
                cardNumber: [""],
                securityCode: [""],
                expirationMonth: [""],
                expirationYear: [""],
            }),
        });

        // populate credit card months

        const startMonth: number = new Date().getMonth() + 1;
        this.shopFormService
            .getCreditCardMonths(startMonth)
            .subscribe((data) => {
                this.creditCardMonths = data;
            });

        //populate credit card years
        this.shopFormService.getCreditCardYears().subscribe((data) => {
            this.creditCardYears = data;
        });
        // populate countries
        this.shopFormService.getCountries().subscribe((data) => {
            // console.log("retrieved countries: " + JSON.stringify(data));
            this.countries = data;
        });

        // get total price and quantity

        console.log(this.totalPrice);
        console.log(this.totalQuantity);
        

        // subscribe to the cart totalPrice

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    //subscribe to the cart totalQuantity

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
        
        
    }

    onSubmit() {
        console.log("Handling the submit button");
        console.log(this.checkoutFormGroup.get("customer").value);
        if (this.checkoutFormGroup.invalid) {
          this.checkoutFormGroup.markAllAsTouched();
          
        }
    }

    copyShippingAddressToBillingAddress(event) {
        if (event.target.checked) {
            this.checkoutFormGroup.controls.billingAddress.setValue(
                this.checkoutFormGroup.controls.shippingAddress.value
            );
        } else {
            this.checkoutFormGroup.controls.billingAddress.reset();
        }
    }

    handleMonthsAndYears() {
        const creditCardFormGroup = this.checkoutFormGroup.get("creditCard");

        const currentYear: number = new Date().getFullYear();
        const selectedYear: number = Number(
            creditCardFormGroup.value.expirationYear
        );
        let startMonth: number = 0;
        if (currentYear === selectedYear) {
            startMonth = new Date().getMonth() + 1;
        } else {
            startMonth = 1;
        }

        this.shopFormService
            .getCreditCardMonths(startMonth)
            .subscribe((data) => {
                this.creditCardMonths = data;
            });
    }

    getStates(formGroupName: string) {
        const formGroup = this.checkoutFormGroup.get(formGroupName);

        const countryCode = formGroup.value.country.code;
        const countryName = formGroup.value.country.name;

        // populate states

        this.shopFormService
            .getStates(countryCode)
            .subscribe((data) => (this.states = data));
    }

    get firstName() {
        return this.checkoutFormGroup.get("customer.firstName");
    }

    get lastName() {
      return this.checkoutFormGroup.get("customer.lastName");
  }

  get email() {
    return this.checkoutFormGroup.get("customer.email");
}
}
