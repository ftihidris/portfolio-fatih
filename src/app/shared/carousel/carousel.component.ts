import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  imports: [CommonModule],
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() images: any[] = [];
  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef;
  @ViewChild('carouselSection', { static: false }) carouselSection!: ElementRef;

  currentIndex = 0;
  private observer!: IntersectionObserver;
  private autoSlideInterval: any;
  private isUserInteracting = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setupObserver();
      this.addInteractionListeners();
    });
  }

  ngOnDestroy(): void {
    if (this.observer && this.carouselSection?.nativeElement) {
      this.observer.unobserve(this.carouselSection.nativeElement);
    }
    this.stopAutoSlide();
  }
  setupObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            !this.isUserInteracting &&
            this.images.length > 0
          ) {
            this.startAutoSlide();
          } else {
            this.stopAutoSlide();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (this.carouselSection?.nativeElement) {
      this.observer.observe(this.carouselSection.nativeElement);
    }
  }

  addInteractionListeners(): void {
    const el = this.carouselContainer.nativeElement;

    el.addEventListener('mouseenter', this.onUserInteractStart.bind(this));
    el.addEventListener('mouseleave', this.onUserInteractEnd.bind(this));
    el.addEventListener('touchstart', this.onUserInteractStart.bind(this));
    el.addEventListener('touchend', this.onUserInteractEnd.bind(this));
  }

  onUserInteractStart(): void {
    this.isUserInteracting = true;
    this.stopAutoSlide();
  }

  onUserInteractEnd(): void {
    this.isUserInteracting = false;
    this.startAutoSlide();
  }

  moveSlide(step: number) {
    this.currentIndex =
      (this.currentIndex + step + this.images.length) % this.images.length;
    this.renderer.setStyle(
      this.carouselContainer.nativeElement,
      'transform',
      `translateX(-${this.currentIndex * 100}%)`
    );
  }

  startAutoSlide() {
    if (this.autoSlideInterval || this.isUserInteracting) return;
    this.autoSlideInterval = setInterval(() => {
      this.moveSlide(1);
    }, 2000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
      this.autoSlideInterval = null;
    }
  }
}
