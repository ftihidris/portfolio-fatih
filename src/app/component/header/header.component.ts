import { Component, HostListener, Input } from '@angular/core';

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

    if (this.isSidebarVisible) {
      return; // Ignore scroll behavior if sidebar is open
    }

    if (window.innerWidth <= 768) {
      // Apply only for mobile view
      this.isHeaderHidden =
        currentScrollY > this.lastScrollY && currentScrollY > 50;
    } else {
      this.isHeaderHidden = false;
    }

    this.lastScrollY = currentScrollY;
  }

  @HostListener('window:resize', [])
  onResize(): void {
    if (window.innerWidth > 768 && this.isSidebarVisible) {
      this.isSidebarVisible = false;
      this.setBodyScrollLock(false);
    }
  }

  onSectionClick(event: Event): void {
    event.stopPropagation(); // Prevent sidebar from closing
    this.setBodyScrollLock(false); // Ensure scrolling is enabled
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
    if (lock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  ngOnDestroy(): void {
    // Ensure scrolling is enabled when component is destroyed
    document.body.style.overflow = 'auto';
  }
}
