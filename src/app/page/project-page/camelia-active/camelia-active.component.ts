import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../shared/animations';
import { PortfolioService } from '../../../service/portfolio.service';

@Component({
  selector: 'app-camelia-active',
  standalone: false,
  templateUrl: './camelia-active.component.html',
  styleUrls: ['./camelia-active.component.scss'],
  animations: [fadeInAnimation],
})
export class CameliaActiveComponent implements OnInit {
  cameliaNotes: any[] = [];
  cameliaSkill: any[] = [];
  images: any[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getCameliaNotes().subscribe((data) => {
      const colorOrder = [
        'bg-pink-500/50',
        'bg-purple-500/50',
        'bg-orange-500/50',
      ];
      this.cameliaNotes = data.sort(
        (a, b) => colorOrder.indexOf(a.color) - colorOrder.indexOf(b.color)
      );
    });

    this.portfolioService.getCameliaSkill().subscribe((data) => {
      this.cameliaSkill = data.sort((a, b) => a.color.localeCompare(b.color));
    });

    this.portfolioService.getCameliaImages().subscribe((data) => {
      if (data.length > 0) {
        const imagesData = data[0];

        // Extract and sort image keys dynamically
        const imageKeys = Object.keys(imagesData)
          .filter(
            (key) =>
              key.startsWith('camelia-') && !isNaN(parseInt(key.split('-')[1]))
          )
          .sort(
            (a, b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1])
          );

        if (imageKeys.length > 0) {
          // Load the first image with high priority
          this.images = [{ src: imagesData[imageKeys[0]], priority: true }];
          // Incrementally load the remaining images
          imageKeys.slice(1).forEach((key, index) => {
            setTimeout(() => {
              this.images.push({ src: imagesData[key], priority: false });
            }, index * 50); // Adjust the delay as needed
          });
        }
      }
    });
  }
}
