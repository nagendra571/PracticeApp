import { Recipe } from './../recipes/recipe.model';
import { EventEmitter, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe('A Test Recipe1', 'Test1', 'http://picturetherecipe.com/wp-content/uploads/2020/04/Vanilla-Cardamom-Kulfi-PTR-Featured-680x900.jpg'),
    new Recipe('A Test Recipe2', 'Test2', 'http://picturetherecipe.com/wp-content/uploads/2020/04/Vanilla-Cardamom-Kulfi-PTR-Featured-680x900.jpg')
  ];

  addRecipe(obj: Recipe){
    this.recipes.push(obj);
  }

}
