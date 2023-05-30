import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent {
  goalsObservable: Observable<IGoalModelAngular[]>;
  numOfGoals = 0;

  constructor(private goalService: GoalService, private router: Router, activatedRoute: ActivatedRoute) {
    // This is for getting all of the goals
    this.goalsObservable = goalService.getAllGoals();
    this.goalsObservable.subscribe((result) => {
      this.numOfGoals = result.length
      console.log("user's total number of goals: ", this.numOfGoals)
    })
  }
}
