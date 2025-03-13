import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Aura from '@primeng/themes/aura';
import { HomePageComponent } from './page/home-page/home-page.component';

import { ContactPageComponent } from './page/contact-page/contact-page.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutPageModule } from './page/about-page/about-page.module';
import { CommonModule } from '@angular/common';
import { ToggleButtonComponent } from './shared/toggle-button/toggle-button.component';
import { ProjectPageModule } from './page/project-page/project-page.module';
import { FormsModule } from '@angular/forms';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { PortfolioService } from './service/portfolio.service';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { FirebaseService } from './services/firebase.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { SkeletonModule } from 'primeng/skeleton';
import { provideHttpClient } from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactPageComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
  ],

  imports: [
    BrowserModule,
    ToastModule,
    AppRoutingModule,
    AvatarModule,
    CommonModule,
    FormsModule,
    AboutPageModule,
    ProjectPageModule,
    AvatarGroupModule,
    BrowserAnimationsModule,
    ToggleButtonComponent,
    SkeletonModule,
    CarouselModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
  ],

  providers: [
    MessageService,
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Initialize Firebase
    provideFirestore(() => getFirestore()), // Provide Firestore
    // provideClientHydration(),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    PortfolioService,
    FirebaseService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
