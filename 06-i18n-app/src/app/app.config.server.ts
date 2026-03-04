import { mergeApplicationConfig, ApplicationConfig, REQUEST, inject } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { SERVER_LANG_TOKEN } from './service/language.service';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: SERVER_LANG_TOKEN,
      useFactory: () => {
        const req = inject(REQUEST, { optional: true });
        if (!req) {
          return 'it';
        }
        const cookies = req.headers.get('cookie') ?? '';
        const langCookie =
          cookies.split(';').find((cookie) => cookie.trim().startsWith('lang=')) ?? 'lang=it';
        const [, langValue] = langCookie.split('=');
        return langValue;
      },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
