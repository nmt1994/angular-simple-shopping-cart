import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "app/models/cart-item.model";
import { DeliveryOption } from "app/models/delivery-option.model";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { DeliveryOptionsDataService } from "app/services/delivery-options.service";
import { ProductsDataService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { LoginService } from "app/services/login.service";

interface ICartItemWithProduct extends CartItem {
  product: Product;
  totalCost: number;
}

@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  public totalAmount: number = 0;
  public inputMoney: number = 0;

  private products: Product[];
  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,
    private deliveryOptionService: DeliveryOptionsDataService,
    private shoppingCartService: ShoppingCartService,
    private toastr: ToastrService, private router: Router, private http: HttpClient, private loginSvc: LoginService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {

    if (this.loginSvc.getUserInfo() == null) {
      this.toastr.warning('Please login before checking out :)', 'This is requirement');
      this.router.navigate(['/login']);
    }

    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
    this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
          .map((item) => {
            const product = this.products.find((p) => p._id === item.productId);
            return {
              ...item,
              product,
              totalCost: product.price * item.quantity
            };
          });
      });
    });
  }

  public onPurchaseClick(): void {
    const subscription = this.cart.subscribe(res => {
      console.log('onPurchaseClick', res);
      if (this.inputMoney < res.grossTotal) {
        this.toastr.error("Please invest more money!", "Check out");
      } else if (this.inputMoney == res.grossTotal) {
        this.toastr.info("Alright ! Placing your order :)", "Check out");
        this.placeOrder(res);
      } else {
        this.toastr.error("Please invest less money!", "Check out");
      }
      if (subscription) subscription.unsubscribe();
    })

    if (subscription) subscription.unsubscribe();

  }

  public placeOrder(cart: any): void {
    const body = {
      userId: this.loginSvc.getUserInfo()._id,
      items: cart.items,
      total: cart.grossTotal
    }
    this.http.post('api/order', body).subscribe(res => {
      this.toastr.success('Order placed ! ', 'Orderer');
      this.router.navigate(['/confirmed']);
    }, err => {
      this.toastr.error('Something wrong happened ! Please try again', 'Checkout ');
    })
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
