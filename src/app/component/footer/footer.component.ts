import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../service/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  constructor(private portfolioService: PortfolioService) {}

  connectMe: {
    name: string;
    class: string;
    action: () => void;
    color: string;
    ariaLabel: string;
  }[] = [];

  ngOnInit() {
    this.connectMe = this.portfolioService.getConnectMe();
  }

  copyToClipboard(email: string) {
    this.portfolioService.copyToClipboard(email);
  }
  poweredBy = [
    {
      name: 'Angular',
      src: 'assets/logo/angular.svg',
      alt: 'Angular Logo',
    },
    {
      name: 'Tailwind',
      src: 'assets/logo/tailwind.svg',
      alt: 'Tailwind Logo',
    },
    {
      name: 'Firebase',
      src: 'assets/logo/firebase.svg',
      alt: 'Firebase Logo',
    },
  ];
}
