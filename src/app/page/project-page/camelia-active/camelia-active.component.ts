import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fadeInAnimation } from '../../../shared/animations';
import { PortfolioService } from '../../../service/portfolio.service';

@Component({
  selector: 'app-camelia-active',
  standalone: false,
  templateUrl: './camelia-active.component.html',
  styleUrl: './camelia-active.component.scss',
  animations: [fadeInAnimation],
})
export class CameliaActiveComponent {
  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef;
  cameliaNotes: any[] = [];
  cameliaSkill: any[] = [];
  currentIndex = 0;
  images = [
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/camelia%2Fcamelia-1.webp?alt=media&token=c0e87de5-5861-4e05-a413-46dc17e74555',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/camelia%2Fcamelia-2.webp?alt=media&token=4ffc5b07-9341-4679-b1db-5186632f593d',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/camelia%2Fcamelia-3.webp?alt=media&token=2386c58b-028d-4106-b0c9-e8fdd55f07bd',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/camelia%2Fcamelia-4.webp?alt=media&token=ecb6ab7e-dd4e-4912-accc-78d552a0c090',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/camelia%2Fcamelia-5.webp?alt=media&token=9ef6c574-7488-49d1-b82d-184778e6a58e',
  ];

  constructor(
    private renderer: Renderer2,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.portfolioService
      .getCameliaNotes()
      .subscribe((data) => (this.cameliaNotes = data));
    this.portfolioService.getCameliaSkill().subscribe((data) => {
      this.cameliaSkill = data.sort((a, b) => a.color.localeCompare(b.color));
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
