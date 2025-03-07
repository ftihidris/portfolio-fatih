import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { FirebaseConfigService } from './app/services/firebase-config.service';
import { HttpClient } from '@angular/common/http';
import { environment } from './environments/environment';
import { initializeApp } from 'firebase/app';

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true,
  })
  .catch((err) => console.error(err));

// const firebaseService = new FirebaseConfigService(new HttpClient({} as any));

// firebaseService.loadFirebaseConfig().then(() => {
//   const config = firebaseService.getConfig();
//   if (config) {
//     environment.firebase = config; // Update environment with secure config
//     initializeApp(config); // Initialize Firebase securely
//   }
//   platformBrowserDynamic().bootstrapModule(AppModule);
// });
