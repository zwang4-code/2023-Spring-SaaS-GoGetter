import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IGoalModelAngular } from '../share/model/IGoalModelAngular';
import { IUserModelAngular } from '../share/model/IUserModelAngular';
import { GoalModel } from '../share/model/GoalModel';
import { UserModel } from '../share/model/UserModel';

@Injectable({
  providedIn: 'root'
})

export class GoalService {
   //appGoalURL = 'http://localhost:8080/app/goal'; 
   //userURL = 'http://localhost:8080/app/user';
  
  appGoalURL = 'https://gogetterapp.azurewebsites.net/app/goal'; 
  userURL = 'https://gogetterapp.azurewebsites.net/app/user';

  constructor(private http: HttpClient) {
  }

  /** GET all goals from the server */
  getAllGoals(): Observable<IGoalModelAngular[]> {
    console.log("Getting all goals using Angular service")
    return this.http.get<IGoalModelAngular[]>(this.appGoalURL)
  }

  /** GET one goal from the server using goalId */
  getGoalById(goalId: string): Observable<IGoalModelAngular> {
    console.log(`Getting goal with ID: ${goalId}`);
    const url = `${this.appGoalURL}/${goalId}`;
    return this.http.get<IGoalModelAngular>(url)
  }

  /** POST: add a new goal to the database */
  addNewGoal(newGoal: GoalModel): Observable<GoalModel> {
    console.log("Adding a new goal using Angular service")
    return this.http.post<GoalModel>(this.appGoalURL, newGoal)
  }

  /** PUT: update a goal to the database */
  updateGoal(goalId: string, updatedGoal: GoalModel): Observable<GoalModel> {
    console.log(`Updating goal with ID: ${goalId}`);
    const url = `${this.appGoalURL}/${goalId}`;
    return this.http.put<GoalModel>(url, updatedGoal)
  }

  // DELETE: Delete a goal from the server
  deleteGoal(goalId: string): Observable<void> {
    console.log(`Deleting goal with ID: ${goalId}`);
    const url = `${this.appGoalURL}/${goalId}`;
    return this.http.delete<void>(url)
  }
   
  //method to update total goals ever created by user
  updateUser(): Observable<UserModel>{
    const updateData = { $inc: { goalCreated: 1 } };
    return this.http.put<GoalModel>(this.userURL, updateData);
  }

  //method to get user details
  getUserById(): Observable<IUserModelAngular> {
    return this.http.get<IUserModelAngular>(this.userURL);
  }
}
