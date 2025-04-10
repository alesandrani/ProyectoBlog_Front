import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Blog, CreateBlogDto, UpdateBlogDto } from '../interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs`;

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getPublicBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/public`);
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  createBlog(blog: CreateBlogDto): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, blog);
  }

  updateBlog(id: string, blog: UpdateBlogDto): Observable<Blog> {
    return this.http.patch<Blog>(`${this.apiUrl}/${id}`, blog);
  }

  deleteBlog(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getBlogsByUser(userId: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/user/${userId}`);
  }
}
