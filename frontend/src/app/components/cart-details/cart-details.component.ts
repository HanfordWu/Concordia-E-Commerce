import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[]=[];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    // get a handler to the cart item

    this.cartItems = this.cartService.cartItems;

    console.log(this.cartItems.length);
    
    

    // subscribe to the cart totalPrice

    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )

    //subscribe to the cart totalQuantity

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )

    // compute cart total price and quantity

    this.cartService.computeCartTotals();

  }
  addQuantity(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  deleteQuantity(cartItem: CartItem){

    this.cartService.reduceCartItemQuantity(cartItem);

    
  }

}
