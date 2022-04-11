import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Directive({
  selector: '[appDueIndicator]'
})
export class DueMinusIndicatorDirective implements AfterViewInit {

  @Input() due: number = 0;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2,
  ) {

  }

  ngAfterViewInit(): void {

    if (typeof this.due === "number" && this.due && Math.sign(this.due) === 1) {
      this.renderer.setStyle(this.elem.nativeElement, 'color', 'green');
    } else {
      this.renderer.setStyle(this.elem.nativeElement, 'color', 'red');
    }

  }

}
