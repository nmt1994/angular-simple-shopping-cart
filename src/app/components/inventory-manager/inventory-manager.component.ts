import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { templateJitUrl } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { ProductsDataService } from 'app/services/products.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'app/services/login.service';

@Component({
    template: `
    <div class="row">
        <h4> Inventory Manager </h4>
        <h6> Manage your inventory was never so easy ! </h6>
    </div>
    <div class="row">
        <div class="small-12 medium-8 columns">
        <div *ngFor="let product of ( product$ | async )">
            <inventory-item [isAdmin]="isAdmin()" [itemData]="product" (onItemSaved)="onSaved($event)"></inventory-item>
        </div>
        </div>
        <div *ngIf="isAdmin()" class="small-12 medium-4 columns">
            <div class="card">
                New item for ADMIN only
                <form [formGroup]="newProductForm">
                    <label>Product name</label>
                    <input placeholder="Product name" type="text" formControlName="productName" />
                    <label>Description</label>
                    <input placeholder="Product description" type="text" formControlName="productDescription" />
                    <label>Price</label>
                    <input placeholder="Product price" type="number" min="0" formControlName="productPrice" />
                    <label>Quantity</label>
                    <input placeholder="Product quantity" type="number" min="0" formControlName="productQuantity" />
                    <button type="button" 
                    class="button info" 
                    (click)="onNewProduct()" 
                    [disabled]="newProductForm?.invalid">Add product</button>
                </form>
            </div>
      </div>
    </div>
    `
})
export class InventoryManagerComponent implements OnInit {
    product$: Observable<any[]> = Observable.of([]);
    newProductForm: FormGroup;

    constructor(private svc: ProductsDataService, private _toastr: ToastrService,
        private _loginSvc: LoginService, private _fb: FormBuilder) {
        this.newProductForm = this._fb.group({
            'productName': ['', Validators.required],
            'productDescription': ['', Validators.required],
            'productPrice': [0, Validators.required],
            'productQuantity': [0, Validators.required]
        })
    }

    public isAdmin(): boolean {
        const userInfo = this._loginSvc.getUserInfo();
        return userInfo != null && userInfo.type === 1;
    }

    ngOnInit() {
        this.product$ = this.svc.all();
    }

    public onSaved($ev: any): void {
        this.product$ = this.svc.all();
    }

    public onNewProduct(): void {
        console.log('onNewproduct', this.newProductForm.value);
        this.svc.createProduct(this.newProductForm.value).subscribe(res => {
            this._toastr.success('New product added!');
            this.onSaved(null);
        });
    }
}


@Component({
    selector: 'inventory-item',
    templateUrl: './inventory-item.component.html'
})
export class InventoryItem implements OnInit {
    @Input() isAdmin: boolean = false;
    @Input() itemData;
    @Output() onItemSaved: EventEmitter<any> = new EventEmitter<any>();

    formInstance: FormGroup;

    constructor(private svc: ProductsDataService, private _fb: FormBuilder, private _toastr: ToastrService) {
        this.formInstance = this._fb.group({
            'quantity': this._fb.control(0)
        })
    }

    ngOnInit() {
        this.formInstance.get('quantity').setValue(this.itemData.quantity);
    }

    public saveProduct(product: any): void {
        const newQuantity = this.formInstance.get('quantity').value;
        console.log('saveProduct', product, newQuantity);

        this.svc.saveProduct(product._id, newQuantity).subscribe(res => {
            this._toastr.success('Item quantity saved !');
            this.onItemSaved.emit(product);
        });
    }

    public removeProduct(product: any): void {
        this.svc.removeProduct(product._id).subscribe(res => {
            this._toastr.success('Product removed!');
            this.onItemSaved.emit(product);
        })
    }
}