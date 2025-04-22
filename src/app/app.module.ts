import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogFormComponent } from './features/blog/pages/blog-form/blog-form.component';

/**
 * Note: This project is using a hybrid approach with both NgModule and standalone components.
 * 
 * For HTTP interceptors:
 * - Functional interceptors are registered in app.config.ts using provideHttpClient(withInterceptors([...]))
 * - Do not register interceptors here to avoid duplicates
 */
@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BlogFormComponent
  ],
  providers: []
})
export class AppModule { }
