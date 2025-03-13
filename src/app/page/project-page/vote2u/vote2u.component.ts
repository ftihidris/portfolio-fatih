import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { fadeInAnimation } from '../../../shared/animations';
import { PortfolioService } from '../../../service/portfolio.service';

@Component({
  selector: 'app-vote2u',
  standalone: false,
  templateUrl: './vote2u.component.html',
  styleUrl: './vote2u.component.scss',
  animations: [fadeInAnimation],
})
export class Vote2uComponent {
  vote2uNotes: any[] = [];
  vote2uSkill: any[] = [];

  constructor(private portfolioService: PortfolioService) {}
  ngOnInit() {
    this.portfolioService.getVote2uNotes().subscribe((data) => {
      const colorOrder = [
        'bg-pink-500/50',
        'bg-purple-500/50',
        'bg-orange-500/50',
      ];

      this.vote2uNotes = data.sort((a: any, b: any) => {
        return colorOrder.indexOf(a.color) - colorOrder.indexOf(b.color);
      });
    });
    this.portfolioService.getVote2uSkill().subscribe((data) => {
      this.vote2uSkill = data.sort((a, b) => a.color.localeCompare(b.color));
    });
  }
}
