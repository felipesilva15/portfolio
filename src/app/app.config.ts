import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import { definePreset } from "@primeng/themes";
import Aura from '@primeng/themes/aura';

const MyPortfolio = definePreset(Aura, {
  semantic: {
    primary: {
      50: 'var(--golden-50)',
      100: 'var(--golden-100)',
      200: 'var(--golden-200)',
      300: 'var(--golden-300)',
      400: 'var(--golden-400)',
      500: 'var(--golden-500)',
      600: 'var(--golden-600)',
      700: 'var(--golden-700)',
      800: 'var(--golden-800)',
      900: 'var(--golden-900)',
      950: 'var(--golden-950)'
    },
    colorScheme: {
      light: {
        primary: {
          color: 'var(--golden-500)',
          inverseColor: '#ffffff',
          hoverColor: 'var(--golden-600)',
          activeColor: 'var(--golden-700)'
        },
        highlight: {
          background: 'var(--golden-50)',
          focusBackground: 'var(--golden-100)',
          color: 'var(--golden-700)',
          focusColor: 'var(--golden-800)'
        }
      },
      dark: {
        primary: {
          color: 'var(--golden-400)',
          inverseColor: 'var(--golden-900)',
          hoverColor: 'var(--golden-300)',
          activeColor: 'var(--golden-200)'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    providePrimeNG({ 
      ripple: true,
      inputStyle: 'outlined',
      theme: {
        preset: MyPortfolio,
        options: {
          prefix: 'p',
          darkModeSelector: '.dark-mode',
          cssLayer: false
        }
      }
    }),
  ],
  
};
