import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector : 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent{

  @Output() onNavClicked: EventEmitter<string> = new EventEmitter();

  linkClicked($event:string){
    this.onNavClicked.emit($event);
  }
}
