// import { Injectable } from '@angular/core';
// import { HttpClient, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import IGoalModelAngular from '../share/model/IGoalModelAngular';
// // import { sample_goals } from 'src/data';

// @Injectable({
//   providedIn: 'root'
// })
// export class GoalService {
//   hostUrl:string = 'http://localhost:8080/';
//   // hostUrl:string = '/'; //'http://localhost:8080/';
//   //url:string = 'http://localhost:8080/data/lists.json';
//   // path:string = 'app/list';

//   constructor(private http: HttpClient) { }

//   getGoalsIndex() {
//     return this.http.get<IGoalModelAngular[]>( this.hostUrl + 'json/lists.json');
//   }

//   getGoals(index: string) {
//     return this.http.get( this.hostUrl + 'json/lists/' + index + '.json');
//   }

// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
// import { Hero } from '../crudpage/read/hero';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';
import { IGoalModelAngular } from '../share/model/IGoalModelAngular';
import { GoalModel } from '../share/model/GoalModel';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  appGoalURL = 'http://localhost:8080/app/goal';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  /** GET all goals from the server */
  getAllGoals(): Observable<IGoalModelAngular[]> {
    console.log("Getting all goals using Angular service")
    return this.http.get<IGoalModelAngular[]>(this.appGoalURL)
      .pipe(
        catchError(this.handleError('getAllGoals', []))
      );
  }
  
  /** GET one goal from the server using goalId */
  getGoalById(goalId: string): Observable<IGoalModelAngular> {
    console.log(`Getting goal with ID: ${goalId}`);
    const url = `${this.appGoalURL}/${goalId}`;
    return this.http.get<IGoalModelAngular>(url)
      .pipe(
        catchError(this.handleError<IGoalModelAngular>('getGoalById'))
      );
  }

  /** POST: add a new goal to the database */
  addNewGoal(newGoal: GoalModel): Observable<GoalModel> {
    console.log("Adding a new goal using Angular service")
    return this.http.post<GoalModel>(this.appGoalURL, newGoal, httpOptions)
      .pipe(
        catchError(this.handleError('addNewGoal', newGoal))
      );
  }

   /** PUT: update a goal to the database */
  updateGoal(goalId: string, updatedGoal: GoalModel): Observable<GoalModel> {
    console.log(`Updating goal with ID: ${goalId}`);
    const url = `${this.appGoalURL}/${goalId}`;
    return this.http.put<GoalModel>(url, updatedGoal)
      .pipe(
        catchError(this.handleError<GoalModel>('updateGoal'))
      );
  }

  // DELETE: Delete a goal from the server
  deleteGoal(goalId: string): Observable<void> {
    console.log(`Deleting goal with ID: ${goalId}`);
    const url = `${this.appGoalURL}/${goalId}`;
    return this.http.delete<void>(url)
      .pipe(
        catchError(this.handleError<void>('deleteGoal'))
      );
  }

  // /* GET heroes whose name contains search term */
  // searchHeroes(term: string): Observable<Hero[]> {
  //   term = term.trim();

  //   // Add safe, URL encoded search parameter if there is a search term
  //   const options = term ?
  //     { params: new HttpParams().set('name', term) } : {};

  //   return this.http.get<Hero[]>(this.appGoalURL, options)
  //     .pipe(
  //       catchError(this.handleError<Hero[]>('searchHeroes', []))
  //     );
  // }

  

  // /** POST: add a new hero to the database */
  // addHero(hero: Hero): Observable<Hero> {
  //   return this.http.post<Hero>(this.getAllGoalsURL, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('addHero', hero))
  //     );
  // }

  /** DELETE: delete the hero from the server */
  // deleteHero(id: number): Observable<unknown> {
  //   const url = `${this.appGoalURL}/${id}`; // DELETE api/heroes/42
  //   return this.http.delete(url, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('deleteHero'))
  //     );
  // }

  // /** PUT: update the hero on the server. Returns the updated hero upon success. */
  // updateHero(hero: Hero): Observable<Hero> {
  //   httpOptions.headers =
  //     httpOptions.headers.set('Authorization', 'my-new-auth-token');

  //   return this.http.put<Hero>(this.appGoalURL, hero, httpOptions)
  //     .pipe(
  //       catchError(this.handleError('updateHero', hero))
  //     );
  // }
}
