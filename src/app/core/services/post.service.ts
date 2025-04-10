import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post, CreatePostDto, UpdatePostDto } from '../interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = `${environment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getPostsByBlog(blogId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/blog/${blogId}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`);
  }

  createPost(blogId: string, post: CreatePostDto): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/blog/${blogId}`, post);
  }

  updatePost(id: string, post: UpdatePostDto): Observable<Post> {
    return this.http.patch<Post>(`${this.apiUrl}/${id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getPostsByUser(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/user/${userId}`);
  }
}
