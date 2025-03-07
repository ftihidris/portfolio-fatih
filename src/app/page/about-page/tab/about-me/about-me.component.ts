import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { fadeInAnimation } from '../../../../shared/animations';
import { PortfolioService } from '../../../../service/portfolio.service';

@Component({
  selector: 'app-about-me',
  standalone: false,
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss',
  animations: [fadeInAnimation],
})
export class AboutMeComponent implements OnInit {
  experienceCards: any[] = [];
  referenceCards: any[] = [];
  constructor(
    private messageService: MessageService,
    private portfolioService: PortfolioService
  ) {}
  ngOnInit() {
    this.portfolioService
      .getReferenceCards()
      .subscribe((data) => (this.referenceCards = data));
    this.portfolioService
      .getExperienceCards()
      .subscribe((data) => (this.experienceCards = data));

    // Only run this code in the browser
  }
  toggleVisibility(card: any, type: 'number' | 'email'): void {
    if (type === 'number') {
      card.showNumber = !card.showNumber;
      card.showEmail = false; // Hide email when showing number
      if (card.showNumber) {
        this.portfolioService.copyToClipboard(card.number);
      }
    } else if (type === 'email') {
      card.showEmail = !card.showEmail;
      card.showNumber = false; // Hide number when showing email
      if (card.showEmail) {
        this.portfolioService.copyToClipboard(card.email);
      }
    }
  }

  // Generate a beep sound

  openWhatsApp(number: string): void {
    const formattedNumber = number.replace(/\D/g, ''); // Remove non-numeric characters
    window.open(`https://wa.me/${formattedNumber}`, '_blank');
  }
}
