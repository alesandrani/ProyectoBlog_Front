import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Blog, CreateBlogDto, UpdateBlogDto } from '@app/core/interfaces/blog';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('Raw API response:', response);
        if (Array.isArray(response)) {
          return response;
        } else if (response && typeof response === 'object') {
          // If response is an object, try to extract an array from it
          const possibleArray = response.data || response.blogs || response.items || [];
          return Array.isArray(possibleArray) ? possibleArray : [];
        }
        return [];
      }),
      catchError(error => {
        console.error('Error in getBlogs:', error);
        return of([]);
      })
    );
  }

  getPublicBlogs(): Observable<Blog[]> {
    return this.http.get<any>(`${this.apiUrl}/public`).pipe(
      map(response => {
        console.log('Raw public blogs response:', response);
        if (Array.isArray(response)) {
          return response;
        } else if (response && typeof response === 'object') {
          const possibleArray = response.data || response.blogs || response.items || [];
          return Array.isArray(possibleArray) ? possibleArray : [];
        }
        return [];
      }),
      catchError(error => {
        console.error('Error in getPublicBlogs:', error);
        return of([]);
      })
    );
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  createBlog(blog: CreateBlogDto): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  updateBlog(id: number, blog: UpdateBlogDto): Observable<Blog> {
    return this.http.patch<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMyBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/me`);
  }
} 