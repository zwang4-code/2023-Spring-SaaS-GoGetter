import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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
    this.handleError = httpErrorHandler.createHandleError();
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
}
