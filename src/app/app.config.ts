import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'here-we-go-a79ad',
        appId: '1:276979762312:web:d7aef1bc81a8cb6449cb3d',
        storageBucket: 'here-we-go-a79ad.firebasestorage.app',
        apiKey: 'AIzaSyAZ6a9B6hsXlTY0MZ-ECeK-weTm_QgMtr8',
        authDomain: 'here-we-go-a79ad.firebaseapp.com',
        messagingSenderId: '276979762312',
        measurementId: 'G-FZ7MRSE0Q2',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
