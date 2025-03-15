import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { PortfolioService } from '../../../service/portfolio.service';
import { fadeInAnimation } from '../../../shared/animations';

@Component({
  selector: 'app-portfolio',
  standalone: false,
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  animations: [fadeInAnimation],
})
export class PortfolioComponent {
  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef;
  portfolioNotes: any[] = [];
  portfolioSkills: any[] = [];
  currentIndex = 0;
  images: any[] = [];

  constructor(
    private renderer: Renderer2,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.portfolioService.getPortfolioNotes().subscribe((data) => {
      const colorOrder = [
        'bg-pink-500/50',
        'bg-purple-500/50',
        'bg-orange-500/50',
      ];

      this.portfolioNotes = data.sort((a: any, b: any) => {
        return colorOrder.indexOf(a.color) - colorOrder.indexOf(b.color);
      });
    });
    this.portfolioService.getPortfolioSkills().subscribe((data) => {
      this.portfolioSkills = data.sort((a, b) =>
        a.color.localeCompare(b.color)
      );
    });
    this.portfolioService.getPorfolioImages().subscribe((data) => {
      if (data.length > 0) {
        const imagesData = data[0];

        // Extract and sort image keys dynamically
        const imageKeys = Object.keys(imagesData)
          .filter(
            (key) =>
              key.startsWith('portfolio-') &&
              !isNaN(parseInt(key.split('-')[1]))
          )
          .sort(
            (a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1])
          );

        if (imageKeys.length > 0) {
          // Load the first image with high priority
          this.images = [{ src: imagesData[imageKeys[0]], priority: true }];

          // Incrementally load the remaining images
          imageKeys.slice(1).forEach((key, index) => {
            setTimeout(() => {
              this.images.push({ src: imagesData[key], priority: false });
            }, index * 50); // Staggered loading for smoothness
          });
        }
      }
    });
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
}
