import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post, CreatePostDto, UpdatePostDto } from '../../../core/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  getPostsByBlog(blogId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/blog/${blogId}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(post: CreatePostDto): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }

  updatePost(id: string, post: UpdatePostDto): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMyPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/me`);
  }
} 