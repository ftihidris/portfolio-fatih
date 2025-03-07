import { Component, OnInit } from '@angular/core';
import { fadeInAnimation, onRouteChange } from '../../../../shared/animations';
import { PortfolioService } from '../../../../service/portfolio.service';

@Component({
  selector: 'app-certificates',
  standalone: false,
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
  animations: [fadeInAnimation],
})
export class CertificatesComponent implements OnInit {
  certsCards: any[] = [];

  constructor(private portfolioService: PortfolioService) {}
  ngOnInit(): void {
    this.portfolioService
      .getCertsCards()
      .subscribe((data) => (this.certsCards = data));
  }

  openLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
