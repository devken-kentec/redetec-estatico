import { provideServiceWorker } from '@angular/service-worker';
import { ApplicationConfig, LOCALE_ID, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
        timeOut: 5000,
        progressBar: true,
        progressAnimation: 'increasing'
    }),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-br' }, provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    }), provideServiceWorker('ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
    })]
};
