import { Component } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { Router } from '@angular/router';
import { StorageService } from 'app/services/storage.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    userName: string = '';
    password: string = '';

    constructor(private _loginSvc: LoginService,
        private _router: Router, private storage: StorageService, private _toastr: ToastrService) {

    }

    ngOnInit() {
        const userInfo = this.getUserInfo();
        if (userInfo != null) this._loginSvc.login(userInfo.username, userInfo.password);
    }

    public onLoginClick(): void {
        this._loginSvc.login(this.userName, this.password).subscribe(res => {
            this._toastr.success('Login success ! Welcome ', 'WebShop');
            this.storage.get()['userInfo'] = JSON.stringify(res);
        }, err => {
            this._toastr.error('Login failed !');
        })
    }

    public getUserInfo(): any {
        const userInfo = this.storage.get()['userInfo'] != null ? JSON.parse(this.storage.get()['userInfo']) : null;

        return userInfo;
    }
}