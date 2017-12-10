import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { DeliveryOption } from "../models/delivery-option.model";
import { CachingServiceBase } from "./caching.service";

@Injectable()
export class DeliveryOptionsDataService extends CachingServiceBase {
  private deliveryOptions: Observable<DeliveryOption[]>;

  public constructor(private http: HttpClient) {
    super();
  }

  public all(): Observable<DeliveryOption[]> {
    return this.http.get<DeliveryOption[]>("./assets/delivery-options.json");
    // .map((item) => {
    //   let model = new DeliveryOption();
    //   model.updateFrom(item);
    //   return model;
    // })));

  }
}
