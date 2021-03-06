import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { PopulatedCartRouteGuard } from "./route-guards/populated-cart.route-guard";

import { LoginComponent } from './components/login/login.component';
import { OrderListComponent } from "app/components/order-list/order-list.component";
import { InventoryManagerComponent } from "app/components/inventory-manager/inventory-manager.component";

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                canActivate: [PopulatedCartRouteGuard],
                component: CheckoutComponent,
                path: "checkout"
            },
            {
                // canActivate: [PopulatedCartRouteGuard],
                component: LoginComponent,
                path: "login"
            },
            {
                canActivate: [PopulatedCartRouteGuard],
                component: OrderConfirmationComponent,
                path: "confirmed"
            },
            {
                component: OrderListComponent,
                path: 'Order'
            },
            {
                component: InventoryManagerComponent,
                path: 'Inventory'
            },
            {
                component: StoreFrontComponent,
                path: "**"
            }], { useHash: true })
    ]
})
export class AppRoutingModule { }
