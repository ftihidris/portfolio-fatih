import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  Inject,
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

  // uploadAboutCards() {
  //   this.portfolioService.vote2uSkill.forEach((card) => {
  //     this.firebaseService.uploadData('vote2uSkill', card);
  //   });
  //   this.portfolioService.vote2uNotes.forEach((card) => {
  //     this.firebaseService.uploadData('vote2uNotes', card);
  //   });
  // }

  ngAfterViewInit() {
    setTimeout(() => this.restoreScrollPosition(), 200);
  }

  restoreScrollPosition() {
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    if (savedScrollPos && this.scrollContainer?.nativeElement) {
      this.scrollContainer.nativeElement.scrollTop = parseInt(
        savedScrollPos,
        10
      );
    } else {
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

  onScroll() {
    sessionStorage.setItem(
      'scrollPos',
      this.scrollContainer.nativeElement.scrollTop.toString()
    );
    this.detectSection(); // Add this line
  }

  detectSection() {
    const sections = ['home', 'about', 'project', 'contact'];
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
