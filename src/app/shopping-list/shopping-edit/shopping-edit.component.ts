import { ShoppinglistService } from './../../Services/shoppinglist.Service';
import { Ingredient } from './../../shared/Ingredient.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  IngName: string;
  IngAmount: number;

  constructor(private shoppingService: ShoppinglistService ) { }

  ngOnInit(): void {
  }

  AddMe(){

    const ing = new Ingredient(this.IngName, this.IngAmount);
    this.shoppingService.addIngredient(ing);
    this.IngName = '';
    this.IngAmount = 0;
  }


}
