import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './recipes/recipes-detail/recipes-detail.component';
import { RecipesItemComponent } from './recipes/recipes-list/recipes-item/recipes-item.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { HighlighterDirective } from './CustomDirectives/Highlighter.directive';
import { BetterHighlighterDirective } from './CustomDirectives/better-highlighter.directive';
import { dropdownDirective } from './CustomDirectives/dropdown.directive';
import { Page1Component } from './pages/page1/page1.component';
import { Page2Component } from './pages/page2/page2.component';
import { Page3Component } from './pages/page3/page3.component';
import { Page4Component } from './pages/page4/page4.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalConfigDynamicModule } from './Configurations/msal-application.module';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
const isIframe = window !== window.parent && !window.opener;

const RouterMap: Routes = [
  // {path: '', component: AppComponent, canActivate: [MsalGuard]},
  //{path: '', component: Page1Component, canActivate: [MsalGuard]},
  {path: 'page2', component: Page2Component, canActivate: [MsalGuard]},
  {path: 'page3', component: Page3Component, canActivate: [MsalGuard]},
  {path: 'page4', component: Page4Component, canActivate: [MsalGuard]},
  {path: 'recipes', component: RecipesComponent, canActivate: [MsalGuard]},
  {path: 'shoppinglist', component: ShoppingListComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipesDetailComponent,
    RecipesItemComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    HighlighterDirective,
    BetterHighlighterDirective,
    dropdownDirective,
    Page1Component,
    Page2Component,
    Page3Component,
    Page4Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(RouterMap, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled' // Don't perform initial navigation in iframes
    }),
    MsalConfigDynamicModule.forRoot('assets/configuration.json'),
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    MsalGuard
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
