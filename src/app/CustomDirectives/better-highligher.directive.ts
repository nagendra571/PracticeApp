import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBetterHighligher]'
})
export class BetterHighligherDirective implements OnInit {

  constructor(private elemRef: ElementRef, private rendered: Renderer2) {

  }

  ngOnInit(){
    this.rendered.setStyle(this.elemRef.nativeElement, 'backgroundColor', 'lightgreen');
  }

}
