import { RecipesService } from './../../../Services/Recipes.Service';
import { Recipe } from './../../recipe.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes-item',
  templateUrl: './recipes-item.component.html',
  styleUrls: ['./recipes-item.component.css']
})
export class RecipesItemComponent implements OnInit {

  @Input() r: Recipe = new Recipe("","","");

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
  }

  onRecipeClick(r:Recipe)
  {
    this.recipesService.recipeSelected.emit(r);
  }

}
