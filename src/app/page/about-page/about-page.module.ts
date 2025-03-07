import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutPageRoutingModule } from './about-page-routing.module';
import { AboutPageComponent } from './about-page.component';
import { AchievementsComponent } from './tab/achievements/achievements.component';
import { CertificatesComponent } from './tab/certificates/certificates.component';
import { AboutMeComponent } from './tab/about-me/about-me.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToggleButtonComponent } from '../../shared/toggle-button/toggle-button.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    AboutPageComponent,
    AchievementsComponent,
    AboutMeComponent,
    CertificatesComponent,
  ],
  imports: [
    CommonModule,
    AboutPageRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToggleButtonComponent,
    ToastModule,
    SkeletonModule,
  ],
  exports: [AboutPageComponent],
  providers: [provideAnimationsAsync(), MessageService],
  bootstrap: [AboutPageComponent],
})
export class AboutPageModule {}
