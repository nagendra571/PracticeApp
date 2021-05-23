import { RecipesService } from './../../Services/Recipes.Service';
import { Recipe } from './../recipe.model';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// const ToDoList_ENDPOINT = 'https://genericcoreapi20210517150459.azurewebsites.net/api/TodoItems';
// const ToDoList_ENDPOINT = 'https://genericcoreapi20210517150459.azurewebsites.net/api/TodoItems/getTodoList';
const ToDoList_ENDPOINT = 'https://genericcoreapi20210517150459.azurewebsites.net/getTodoList';
// const ToDoList_ENDPOINT = 'https://localhost:44349/api/TodoItems/getTodoList';



type ProfileType = {
  id: number,
  name: string,
  isComplete?: boolean
};

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipesService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getProfile();
    this.recipes = this.recipeService.recipes;
  }

  getProfile() {
    this.http.get(ToDoList_ENDPOINT)
      .subscribe((p: ProfileType[]) => {
        console.log(p);
        p.forEach((item, index) => {
          this.recipes.push(new Recipe(item.name, item.name, 'http://picturetherecipe.com/wp-content/uploads/2020/04/Vanilla-Cardamom-Kulfi-PTR-Featured-680x900.jpg'));
          })
      });
  }

}
