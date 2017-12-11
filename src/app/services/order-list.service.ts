import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class OrderListService {
    constructor(private httpClient: HttpClient) { }

    public getOrdersByUserId(userId: any): Observable<any[]> {
        return this.httpClient.get<any[]>(`api/order/${userId}`);
    }
}