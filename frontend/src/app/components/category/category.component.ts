import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';
import { ProgressEnum } from 'src/app/share/enum/ProgressEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  goalsObservable: Observable<IGoalModelAngular[]>;
  goals: IGoalModelAngular[] = [];
  Progress = ProgressEnum;

  constructor(private goalService: GoalService,private router: Router, activatedRoute: ActivatedRoute) {
    this.Progress = ProgressEnum;
    // This is for getting all of the goals
    this.goalsObservable = goalService.getAllGoals();
    this.goalsObservable.subscribe((result) => {
        this.goals = result;
      })
  }

  deleteGoal(goalId: string): void{
    this.goalService.deleteGoal(goalId).subscribe((result) => {
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

  hasGoalsInCategories(categories: string[]): boolean {
    return this.goals.some(goal => categories.includes(goal.category));
  }
  
  ngOnInit() {
    //this.getDataFromAPI();
  }

}
