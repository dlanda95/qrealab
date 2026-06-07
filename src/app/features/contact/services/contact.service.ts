import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ContactFormData } from '../models/contact.interface';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  submit(data: ContactFormData): Observable<any> {
    return this.http.post(`${this.base}/api/contact-submissions`, data);
  }
}
