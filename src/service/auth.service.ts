import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject, throwError} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:8080/api/auth";
  private registrationSuccessSubject = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  login(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, formData);
  }

  register(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, formData);
  }
  updateProfile(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile`, formData);
  }
  sendEmailReset(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password?email=${email}`, null);
  }
  sendNewPassword(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/reset-password`, formData, { responseType: 'json' });
  }

  checkResetToken(token: string| null): Observable<any> {
    return this.http.get(`${this.apiUrl}/reset-password?token=${token}`);
  }

  logout(): void {
     localStorage.removeItem('authToken');
     this.registrationSuccessSubject.next('');
     window.location.href = '/account/login';
  }

  saveToken(token: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('authToken', token);
    }
  }

  getToken(): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = 'test';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

}
