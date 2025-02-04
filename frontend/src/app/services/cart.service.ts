import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { CartItem } from "../common/cart-item";

@Injectable({
    providedIn: "root",
})
export class CartService {
    

    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new Subject<number>();
    totalQuantity: Subject<number> = new Subject<number>();

    addToCart(theCartItem: CartItem) {
        //check if we already have the item in our cart
        let alreadyExitsInCart: boolean = false;
        let existingCartItem: CartItem = undefined;

        if (this.cartItems.length > 0) {
            // find the item in the cart based on item id
            // for (let tempCartItem of this.cartItems){
            //   if (tempCartItem.id === theCartItem.id) {
            //     existingCartItem = tempCartItem;
            //     break;
            //   }
            existingCartItem = this.cartItems.find(
                (tempItem) => tempItem.id === theCartItem.id
            );
        }

        // check if we found it

        alreadyExitsInCart = existingCartItem != undefined;

        if (alreadyExitsInCart) {
            existingCartItem.quantity++;
        } else {
            this.cartItems.push(theCartItem);
        }

        // compute cart total price and total quantity
        this.computeCartTotals();
    }
    computeCartTotals() {
        let totalPriceValue: number = 0;
        let totalQuantityValue: number = 0;
        for (let currentCartItem of this.cartItems) {
            totalPriceValue +=
                currentCartItem.quantity * currentCartItem.unitPrice;
            totalQuantityValue += currentCartItem.quantity;
        }
        // publish the new values ..all subscribers will receive the new data
        this.totalPrice.next(totalPriceValue);
        this.totalQuantity.next(totalQuantityValue);

        //log cart data just for debugging purpose
        this.logCartData(totalPriceValue, totalQuantityValue);
    }

    reduceCartItemQuantity(cartItem: CartItem) {
      const itemIndex = this.cartItems.findIndex(
          (tempCartItem) => tempCartItem.id === cartItem.id
      );
      if (cartItem.quantity === 1) {
          this.cartItems.splice(itemIndex, 1);
      }else{
        this.cartItems[itemIndex].quantity--;
      }

      this.computeCartTotals();
  }

    logCartData(totalPriceValue: number, totalQuantityValue: number) {
        console.log("Content of the cart:");
        for (let tempCartItem of this.cartItems) {
            const subTotalPrice =
                tempCartItem.quantity * tempCartItem.unitPrice;
            console.log(
                `name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice = ${tempCartItem.unitPrice}, subtotalPrice=${subTotalPrice}`
            );
        }

        console.log(
            `totalPrice: ${totalPriceValue.toFixed(
                2
            )}, totalQuantity: ${totalQuantityValue}`
        );

        console.log("-------------");
    }

    constructor() {}
}
