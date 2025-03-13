import { Component } from '@angular/core';

@Component({
  selector: 'app-project-page',
  standalone: false,
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.scss',
})
export class ProjectPageComponent {
  rows = [['Camelia.active', 'Portfolio', 'Vote2U', 'Artzology']];
  selectedOption = 'Camelia.active';

  ngOnInit(): void {}

  onSelectionChange(option: string): void {
    this.selectedOption = option;
  }
}
