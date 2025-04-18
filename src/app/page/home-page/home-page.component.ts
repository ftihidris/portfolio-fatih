import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { staggerAnimations } from '../../shared/animations';
import { PortfolioService } from '../../service/portfolio.service';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [staggerAnimations],
})
export class HomePageComponent implements OnInit, AfterViewInit {
  rotationAngle = 0;
  iconsContact: {
    name: string;
    class: string;
    action: () => void;
    color: string;
    ariaLabel: string;
  }[] = [];
  projectCards: any[] = [];
  aboutCards: any[] = [];
  iconsSkill: any[] = [];

  constructor(
    private portfolioService: PortfolioService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit() {
    this.iconsContact = this.portfolioService.getIconsContact();
    this.portfolioService
      .getProjectCards()
      .subscribe((data) => (this.projectCards = data));

    this.portfolioService.getIconsSkill().subscribe((data) => {
      this.iconsSkill = data.sort((a, b) => b.color.localeCompare(a.color)); // Sort by color
    });
  }

  ngAfterViewInit() {
    // Move data fetching here
    this.portfolioService
      .getAboutCards()
      .subscribe((data) => (this.aboutCards = data));
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.rotationAngle = window.scrollY * 0.5; // Use window.scrollY
    }
  }
}
