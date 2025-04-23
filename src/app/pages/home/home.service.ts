// src/app/home/home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../../core/interfaces/blog';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) {}

  getPublicBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/public`);
  }
}
