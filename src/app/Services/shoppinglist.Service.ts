import { Ingredient } from "../shared/Ingredient.model";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class ShoppinglistService{

  ingredients: Ingredient[] = [
    new Ingredient('Pepper', 100),
    new Ingredient('Spices', 200),
    new Ingredient('Salt', 300),
    new Ingredient('Oil', 400),
  ];

  addIngredient(obj: Ingredient){
    this.ingredients.push(obj);
  }
}

