import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`);
  }

  updateProfile(data: UpdateUserDto): Observable<User> {
    return this.http.patch<User>(`${this.apiUrl}/profile`, data);
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/profile`);
  }
}
