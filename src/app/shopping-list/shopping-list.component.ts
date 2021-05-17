import { Component, OnInit } from '@angular/core';
import { ShoppinglistService } from '../Services/shoppinglist.Service';
import { Ingredient } from '../shared/Ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppinglistService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.ingredients;
  }

  IngrAdded($event: Ingredient)
  {
    this.ingredients.push($event);
  }

}
