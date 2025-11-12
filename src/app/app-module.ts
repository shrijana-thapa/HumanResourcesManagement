import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { MaterialModule } from 'app/shared/material-module/material-module';
import { provideTranslateService, TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
@NgModule({
  declarations: [App],
  imports: [BrowserModule, AppRoutingModule, RouterModule, MaterialModule, TranslateModule],
  providers: [
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}
