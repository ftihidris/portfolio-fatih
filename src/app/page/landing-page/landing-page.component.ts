import { Component } from '@angular/core';
import { staggerAnimationss } from '../../shared/animations';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  animations: [staggerAnimationss],
})
export class LandingPageComponent {
  hoverState: string = 'none';

  setHoverState(state: string) {
    this.hoverState = state;
  }

  resetHoverState() {
    this.hoverState = 'none';
  }
}
