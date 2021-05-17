import { Directive, ElementRef, OnInit } from "@angular/core";



@Directive({
  selector: '[Highlighter]'
})

export class HighlighterDirective implements OnInit {
  constructor(private thisElement: ElementRef){

  }

  ngOnInit(){
    this.thisElement.nativeElement.style.backgroundColor = "Yellow";
  }

}



