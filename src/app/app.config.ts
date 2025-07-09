import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(), provideFirebaseApp(() => initializeApp({ projectId: "join-96350", appId: "1:1092838001278:web:d5c426c923327eb93a262f", storageBucket: "join-96350.firebasestorage.app", apiKey: "AIzaSyBcHeBTnaWophj_nFjjJ8GK-QaUrMLoaJw", authDomain: "join-96350.firebaseapp.com", messagingSenderId: "1092838001278" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())
  ]
};
