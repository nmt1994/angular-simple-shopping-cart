import { Component, OnInit } from '@angular/core';
import { OrderListService } from 'app/services/order-list.service';
import { LoginService } from 'app/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
    selector: 'order-list',
    template: `<div class="row">
        <h4> Your Orders </h4>
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount of money</th>
                    <th>Shipment status</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let order of (orderList$ | async)">
                    <td> {{ order.date | date: 'longDate' }}</td>
                    <td> {{ order.total || 'Not specififed' }}</td>
                    <td>Not ready</td>
                </tr>
            </tbody>
        </table>
    </div>`
})

export class OrderListComponent implements OnInit {

    orderList$: Observable<any[]> = Observable.of([]);

    constructor(private orderListSvc: OrderListService,
        private loginSvc: LoginService, private _toastr: ToastrService, private _router: Router) {

    }

    ngOnInit() {
        if (this.loginSvc.getUserInfo() == null) {
            this._toastr.warning('You are not logged in!', 'Go home');
            this._router.navigate(['/login']);
        }

        this.orderList$ = this.orderListSvc.getOrdersByUserId(this.loginSvc.getUserInfo()._id);
    }

    ngOnDestroy() {

    }
}