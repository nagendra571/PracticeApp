import { Recipe } from './recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from '../Services/Recipes.Service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  SelectedRecipeItem:Recipe = new Recipe("","","");
  constructor(private recipsService: RecipesService) { }

  ngOnInit(): void {
    this.recipsService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.SelectedRecipeItem = recipe;
      }
    );
  }


}
