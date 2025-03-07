import { Injectable, inject, EnvironmentInjector } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector); // ✅ Get the Angular injector

  uploadData(collectionName: string, data: any): void {
    this.injector.runInContext(async () => {
      try {
        const ref = collection(this.firestore, collectionName);
        await addDoc(ref, data);
        console.log(`Data added to ${collectionName}`);
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    });
  }
}
