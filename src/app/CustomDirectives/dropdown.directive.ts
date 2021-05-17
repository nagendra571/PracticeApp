import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})

export class dropdownDirective implements OnInit{

  constructor(private elemRef: ElementRef, private renderer: Renderer2){
  }

  ngOnInit(){
    //this.renderer.setAttribute(this.elemRef, 'addclass', 'open');
  }

  @HostBinding('class.open') isMouseOver = false;

  @HostListener('mouseenter') mouseover(eventData: Event){
    this.isMouseOver = true;
  }

  @HostListener('mouseleave') mouseleft1(eventData: Event){
    this.isMouseOver = false;
  }

}

