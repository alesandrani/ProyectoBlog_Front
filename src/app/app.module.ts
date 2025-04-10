import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useValue: authInterceptor,
      multi: true
    }
  ]
})
export class AppModule { } 