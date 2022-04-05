import { AfterViewInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Directive({
  selector: '[appWidthFixer]'
})
export class WidthFixerDirective implements AfterViewInit {

  deviceInfo: DeviceInfo | null = null;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2,
    private deviceService: DeviceDetectorService
  ) {
  }

  screenOffset = 10;

  ngAfterViewInit(): void {
    const isMobile = this.deviceService.isMobile();

    this.renderer.setStyle(this.elem.nativeElement, "height", `${window.innerHeight - this.screenOffset * 2}px`)
    this.renderer.setStyle(this.elem.nativeElement, "max-height", `${window.innerHeight - this.screenOffset * 2}px`)
    this.renderer.setStyle(this.elem.nativeElement, "padding", `${this.screenOffset}px`)

    if (isMobile) {
      this.renderer.setStyle(this.elem.nativeElement, "width", `${window.innerWidth - this.screenOffset * 2}px`)
      this.renderer.setStyle(this.elem.nativeElement, "max-width", `${window.innerWidth - this.screenOffset * 2}px`)
    } else {
      this.renderer.setStyle(this.elem.nativeElement, "width", `500px`)
      this.renderer.setStyle(this.elem.nativeElement, "max-width", `500px`)
    }

    // this.deviceInfo = this.deviceService.getDeviceInfo();
    // const isTablet = this.deviceService.isTablet();
    // const isDesktopDevice = this.deviceService.isDesktop();
    // console.log(this.deviceInfo);
    // console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    // console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    // console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.

  }

}
