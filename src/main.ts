import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from './environment/environment';
import { RouterModule } from '@angular/router';
import { routes } from './app/app.routes';

const appConfig = {
  providers: [
    importProvidersFrom(
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAuthModule,
      RouterModule.forRoot(routes)
    ),
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
