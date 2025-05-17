import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
}

interface SignupResponse {
  message: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Adjust if deployed

  constructor(private http: HttpClient) {}

  login(authRequest: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, authRequest);
  }
 signup(authRequest: AuthRequest): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.baseUrl}/register`, authRequest);
  }
  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken(): string | null {
    return localStorage.getItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem('jwt');
  }
  getUserInfo(): any {
  const token = this.getToken();
  if (!token) return null;

  const payload = token.split('.')[1];
  try {
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (e) {
    console.error('Error decoding token:', e);
    return null;
  }
}
}