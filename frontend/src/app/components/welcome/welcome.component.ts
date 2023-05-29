import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuoteService } from '../../service/quote-service.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  quote: string ='';
  author: string ='';

  constructor(private router: Router, private quoteService: QuoteService) {}

  ngOnInit() {
    this.getQuote()
  }

  getQuote() {
    this.quoteService
    .getQuote()
    .subscribe({
      next: (response) => {
        this.quote = response.content
        this.author = response.author
      },
      error: (error) => {
        console.error('Error adding goal:', error);
      },
    });
  }

  redirectToGoogleAuth(): void {
    console.log("redirecting to Google login")
    window.location.href = '/auth/google';
  }
}
