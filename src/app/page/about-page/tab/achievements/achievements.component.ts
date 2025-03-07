import { Component, OnInit } from '@angular/core';
import { fadeInAnimation, onRouteChange } from '../../../../shared/animations';
import { PortfolioService } from '../../../../service/portfolio.service';

@Component({
  selector: 'app-achievements',
  standalone: false,
  templateUrl: './achievements.component.html',
  styleUrl: './achievements.component.scss',
  animations: [fadeInAnimation],
})
export class AchievementsComponent implements OnInit {
  participateCards: any[] = [];

  constructor(private portfolioService: PortfolioService) {}
  ngOnInit(): void {
    this.portfolioService
      .getParticipateCards()
      .subscribe((data) => (this.participateCards = data));
  }

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
