import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Inject,
  HostListener,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FirebaseService } from './services/firebase.service';
import { PortfolioService } from './service/portfolio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements AfterViewInit {
  title = 'portfolio-fatih';
  activeSection: string = '';

  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private firebaseService: FirebaseService,
    private portfolioService: PortfolioService
  ) {}

  ngAfterViewInit() {
    setTimeout(() => this.restoreScrollPosition(), 200);
    window.addEventListener('scroll', this.onScroll.bind(this)); // Attach to window
  }

  restoreScrollPosition() {
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    if (savedScrollPos) {
      window.scrollTo({
        top: parseInt(savedScrollPos, 10),
        behavior: 'smooth',
      });
    }

    const hash = window.location.hash;
    if (hash) {
      const targetElement = this.document.querySelector(hash);
      if (targetElement) {
        setTimeout(
          () => targetElement.scrollIntoView({ behavior: 'smooth' }),
          100
        );
      }
    }
  }
  // uploadAboutCards() {
  //   this.portfolioService.portfolioSkills.forEach((card) => {
  //     this.firebaseService.uploadData('portfolioSkills', card);
  //   });
  //   this.portfolioService.portfolioNotes.forEach((card) => {
  //     this.firebaseService.uploadData('portfolioNotes', card);
  //   });
  // }
  onScroll() {
    sessionStorage.setItem('scrollPos', window.scrollY.toString());
    this.detectSection();
  }

  detectSection() {
    const sections = ['top', 'intro', 'about', 'project', 'contact'];
    let currentSection = '';

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const triggerPoint = window.innerHeight * 0.5; // 50% of viewport height

        if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
          currentSection = section;
          break;
        }
      }
    }

    if (this.activeSection !== currentSection) {
      this.activeSection = currentSection;
    }
  }
}
