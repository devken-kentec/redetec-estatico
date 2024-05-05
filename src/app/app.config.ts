import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
              provideHttpClient(),
              provideAnimations(),
              provideToastr({
                timeOut: 5000,
                progressBar: true,
                progressAnimation: 'increasing'
              }),
              { provide: LOCALE_ID, useValue: 'pt-br'}
  ]
};
