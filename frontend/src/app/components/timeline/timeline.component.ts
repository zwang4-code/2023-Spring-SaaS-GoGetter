import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  goalsObservable: Observable<IGoalModelAngular[]>;
  goals: IGoalModelAngular[] = [];

  constructor(private goalService: GoalService, activatedRoute: ActivatedRoute) {
    // This is for getting all of the goals
    this.goalsObservable = goalService.getAllGoals();

   this.goalsObservable.subscribe((result) => {
      this.goals = result;
    })

  }

  getGoals(): void {
    console.log("get goals")
    this.goalService.getAllGoals().subscribe(goals => (this.goals = goals));
  }

  deleteGoal(goalId: string): void{
    this.goalService.deleteGoal(goalId).subscribe(() => {
      // Refresh the goals list after successful deletion
      this.getGoals();
    });
  }

  ngOnInit() {
    //this.getDataFromAPI();
  }

}
