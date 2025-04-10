import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, CreateBlogDto, UpdateBlogDto } from '@app/core/interfaces/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:3000/api/blogs';

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
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

  getMyBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/me`);
  }
} 