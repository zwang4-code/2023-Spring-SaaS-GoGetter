import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';
import { Router } from '@angular/router';
import { ProgressEnum } from 'src/app/share/enum/ProgressEnum';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  goalsObservable: Observable<IGoalModelAngular[]>;
  goals: IGoalModelAngular[] = [];
  Progress = ProgressEnum;
  

  constructor(private goalService: GoalService, private router: Router, activatedRoute: ActivatedRoute) {
    // This is for getting all of the goals
    this.Progress = ProgressEnum;
    this.goalsObservable = goalService.getAllGoals();

    this.goalsObservable.subscribe((result) => {
        this.goals = result;
      })

  }

  getGoals(): void {
    console.log("get all goals");
    this.goalService.getAllGoals().subscribe(goals => (this.goals = goals));
  }

  deleteGoal(goalId: string): void{
    console.log("deleting goal:" + goalId);
    this.goalService.deleteGoal(goalId).subscribe(() => {
      // Refresh the goals list after successful deletion
      this.goalsObservable.subscribe((result) => {
        this.goals = result;
      })
    });
  }

  openEditGoal(goal: IGoalModelAngular): void {
    // Navigate to the edit goal component passing the goal ID as a parameter
    this.router.navigate(['/update', goal.goalId]);
  }
  
  ngOnInit() {
    //this.getDataFromAPI();
  }

}
