import { Component } from "@angular/core";
import { LoginService } from "app/services/login.service";
import { StorageService } from "app/services/storage.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {

  constructor(private storage: StorageService, private _loginSvc: LoginService) {

  }

  public getUserInfo(): any {
    return this._loginSvc.getUserInfo();
  }

  public onLogoutClick(): any {
    console.log('Logging out');
    this._loginSvc.logout();
  }
}
