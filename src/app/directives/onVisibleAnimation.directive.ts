import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, inject, Input, NgZone, PLATFORM_ID  } from '@angular/core';

@Directive({
    selector: '[onVisibleAnimation]',
    standalone: true
})
export class OnVisibleAnimation {

    private element = inject(ElementRef)
    private platformId = inject(PLATFORM_ID);
    private ngZone = inject(NgZone);
    private observer?: IntersectionObserver;

    @Input() animationClass = "";

    ngOnInit() {
        if (!isPlatformBrowser(this.platformId)) return;

        this.ngZone.runOutsideAngular(() => {
            this.observer = new IntersectionObserver(([entry]) => {
                this.element.nativeElement.classList.toggle(this.animationClass, entry.isIntersecting);
            },{ threshold: 0 });

            this.observer.observe(this.element.nativeElement);
        });
    }

    ngOnDestroy() {
        this.observer?.disconnect();
    }

}
