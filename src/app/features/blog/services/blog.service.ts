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
        let blogs: Blog[] = [];
        
        if (Array.isArray(response)) {
          blogs = response;
        } else if (response && typeof response === 'object') {
          // If response is an object, try to extract an array from it
          const possibleArray = response.data || response.blogs || response.items || [];
          blogs = Array.isArray(possibleArray) ? possibleArray : [];
        }
        
        // Ensure tags is always an array for each blog
        return blogs.map(blog => {
          if (blog.tags && !Array.isArray(blog.tags)) {
            blog.tags = Object.values(blog.tags);
          }
          return blog;
        });
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
        let blogs: Blog[] = [];
        
        if (Array.isArray(response)) {
          blogs = response;
        } else if (response && typeof response === 'object') {
          const possibleArray = response.data || response.blogs || response.items || [];
          blogs = Array.isArray(possibleArray) ? possibleArray : [];
        }
        
        // Ensure tags is always an array for each blog
        return blogs.map(blog => {
          if (blog.tags && !Array.isArray(blog.tags)) {
            blog.tags = Object.values(blog.tags);
          }
          return blog;
        });
      }),
      catchError(error => {
        console.error('Error in getPublicBlogs:', error);
        return of([]);
      })
    );
  }

  getBlogById(id: number): Observable<Blog | null> {
    // Expecting a response like { data: Blog, ... }
    return this.http.get<{ data: Blog }>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const blog = response.data; // Extract blog from data property
        console.log('Blog data extracted in service:', JSON.stringify(blog, null, 2));

        if (!blog) {
          console.warn('No blog data found in response for ID:', id);
          return null;
        }

        // Ensure tags is always an array
        if (blog.tags && !Array.isArray(blog.tags)) {
          try {
            blog.tags = Object.values(blog.tags);
          } catch (e) {
            console.warn('Could not convert tags to array:', blog.tags);
            blog.tags = [];
          }
        } else if (!blog.tags) {
          blog.tags = [];
        }

        // Check for author data WITHIN the extracted blog object
        if (!blog.author) {
           console.warn('Author data missing in blog object for ID:', blog.id);
           // Template guard (*ngIf="blog.author") will handle this
        }

        return blog; // Return the extracted blog object
      }),
      catchError(error => {
        console.error('Error fetching blog by ID:', id, error);
        return of(null);
      })
    );
  }

  createBlog(blog: CreateBlogDto): Observable<Blog> {
    return this.http.post<any>(this.apiUrl, blog).pipe(
      map(response => {
        // Ensure tags is always an array
        if (response && response.tags && !Array.isArray(response.tags)) {
          response.tags = Object.values(response.tags);
        }
        return response;
      })
    );
  }

  updateBlog(id: number, blog: UpdateBlogDto): Observable<Blog> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, blog).pipe(
      map(response => {
        // Ensure tags is always an array
        if (response && response.tags && !Array.isArray(response.tags)) {
          response.tags = Object.values(response.tags);
        }
        return response;
      })
    );
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMyBlogs(): Observable<Blog[]> {
    return this.http.get<any>(`${this.apiUrl}/me`).pipe(
      map(response => {
        console.log('Raw my blogs response:', response);
        let blogs: Blog[] = [];
        
        if (Array.isArray(response)) {
          blogs = response;
        } else if (response && typeof response === 'object') {
          const possibleArray = response.data || response.blogs || response.items || [];
          blogs = Array.isArray(possibleArray) ? possibleArray : [];
        }
        
        // Ensure tags is always an array for each blog
        return blogs.map(blog => {
          if (blog.tags && !Array.isArray(blog.tags)) {
            blog.tags = Object.values(blog.tags);
          }
          return blog;
        });
      }),
      catchError(error => {
        console.error('Error in getMyBlogs:', error);
        return of([]);
      })
    );
  }
} 