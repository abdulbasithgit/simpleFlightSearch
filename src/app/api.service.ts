import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Flight } from './flight';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }

  public getflight(url?: string){
    return this.httpClient.get<Flight[]>(`${this.apiURL}/${url}`);
  }
}
