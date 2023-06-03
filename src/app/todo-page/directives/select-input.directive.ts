import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSelect]',
  standalone: true,
})
export class SelectInputDirective implements OnInit {
  constructor(public renderer2: Renderer2, public elementRef: ElementRef) {}

  ngOnInit() {
    this.renderer2.selectRootElement(this.elementRef.nativeElement).select();
  }
}
