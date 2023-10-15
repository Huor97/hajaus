import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'api'; // Remplacez ceci par l'URL de votre API

  constructor(private http: HttpClient) { }

  getDonnees(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  // Ajoutez d'autres méthodes pour POST, PUT, DELETE, etc. selon les besoins
}
