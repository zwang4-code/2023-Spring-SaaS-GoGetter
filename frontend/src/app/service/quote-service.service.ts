import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  quoteAPIURL = 'https://api.quotable.io/random'

  constructor(private http: HttpClient) {
  }

  /** GET a quote from Quote API */
  getQuote(): Observable<any> {
    console.log("Getting all goals using Angular service")
    return this.http.get<any>(this.quoteAPIURL)
  }

  
}
