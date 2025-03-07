import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-page',
  standalone: false,
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
  rows = [['About Me', 'Certificates', 'Participation']];
  selectedOption = 'About Me';

  ngOnInit(): void {}

  onSelectionChange(option: string): void {
    this.selectedOption = option;
  }
}
