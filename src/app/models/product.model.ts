import { Ingredient } from "app/models/ingredient.model";

export class Product {
  public _id: string;
  public name: string;
  public description: string;
  public price: number;
  public quantity: number;

  public updateFrom(src: any): void {
    this._id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
  }
}
