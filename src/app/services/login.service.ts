import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Observable } from 'rxjs/Observable';
import { StorageService } from 'app/services/storage.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {
    constructor(private httpClient: HttpClient,
        private storage: StorageService, private _router: Router) {
        console.log('LoginService', this);
    }


    public login(username: string, password: string): Observable<any> {
        return this.httpClient.post('api/user/login', {
            username: username,
            password: password
        });
    }

    public logout() {
        this.storage.get().setItem('userInfo', null);
        this._router.navigate(['/login']);
    }

    public getUserInfo(): any {
        const userInfo = this.storage.get()['userInfo'] != null ? JSON.parse(this.storage.get()['userInfo']) : null;

        return userInfo;
    }

}