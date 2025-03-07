import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { fadeInAnimation } from '../../../shared/animations';
import { PortfolioService } from '../../../service/portfolio.service';

@Component({
  selector: 'app-artzology',
  standalone: false,
  templateUrl: './artzology.component.html',
  styleUrl: './artzology.component.scss',
  animations: [fadeInAnimation],
})
export class ArtzologyComponent implements OnInit {
  @ViewChild('carouselContainer', { static: false })
  carouselContainer!: ElementRef;
  currentIndex = 0;
  artzSkill: any[] = [];
  artzNotes: any[] = [];

  images = [
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/artz%2Fartz-1.webp?alt=media&token=07d9bfd3-2b88-41ce-bc07-b49b5c67e10d',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/artz%2Fartz-2.webp?alt=media&token=68481887-7e58-4da9-a897-dafbd02d6664',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/artz%2Fartz-3.webp?alt=media&token=db67019e-2386-4c00-be46-4c0260d599f2',
    'https://firebasestorage.googleapis.com/v0/b/portfolio-website-6d701.firebasestorage.app/o/artz%2Fartz-4.webp?alt=media&token=ee506b89-aa21-40ae-8aea-c002f58adae4',
  ];

  constructor(
    private renderer: Renderer2,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.portfolioService
      .getArtzSkill()
      .subscribe((data) => (this.artzSkill = data));
    this.portfolioService.getArtzNotes().subscribe((data) => {
      this.artzNotes = data.sort((a, b) => a.color.localeCompare(b.color));
    });

    // Only run this code in the browser
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
