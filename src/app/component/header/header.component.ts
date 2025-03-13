import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() activeSection: string = '';

  isSidebarVisible: boolean = false;
  isHeaderHidden: boolean = false;
  lastScrollY: number = 0;

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentScrollY = window.scrollY;

    if (window.innerWidth <= 768) {
      // Apply only for mobile view
      this.isHeaderHidden =
        currentScrollY > this.lastScrollY && currentScrollY > 50;
    } else {
      this.isHeaderHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.setBodyScrollLock(this.isSidebarVisible);
  }

  closeSidebar(): void {
    this.isSidebarVisible = false;
    this.setBodyScrollLock(false);
  }

  private setBodyScrollLock(lock: boolean): void {
    document.body.style.overflow = lock ? 'hidden' : 'auto';
  }

  ngOnDestroy(): void {
    // Ensure scrolling is enabled when component is destroyed
    document.body.style.overflow = 'auto';
  }
}
