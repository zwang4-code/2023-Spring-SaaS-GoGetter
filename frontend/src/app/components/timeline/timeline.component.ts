import { Component, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';
import { Router } from '@angular/router';
import { ProgressEnum } from 'src/app/share/enum/ProgressEnum';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css'],
})
export class TimelineComponent {
  goalsObservable: Observable<IGoalModelAngular[]>;
  goals: IGoalModelAngular[] = [];
  goalsListCopy: IGoalModelAngular[] = [];
  Progress = ProgressEnum;
  checked = false;

  constructor(private goalService: GoalService, private router: Router) {
    // This is for getting all of the goals
    this.Progress = ProgressEnum;
    this.goalsObservable = goalService.getAllGoals();
    this.goalsObservable.subscribe((result) => {
        this.goals = result;
        this.goalsListCopy = this.goals;  // save the full list of goals in a separate copy

        this.goals.sort((a, b) => {
          const dateA = new Date(a.endDate);
          const dateB = new Date(b.endDate);
          return dateA.getTime() - dateB.getTime();
        });
      })

  }

  ngOnInit() {
    this.getCheckboxStatus()
  }

  handleHideCheckbox() {
    this.checked = !this.checked
    this.getCheckboxStatus()
    this.hideCompletedGoals()
  }

  getCheckboxStatus() {
    if (this.checked) {
      console.log('Checkbox is checked');
    } else {
      console.log('Checkbox is not checked');
    }
  }

  hideCompletedGoals() {
    if (this.checked) {
      console.log("filtering out completed goals")
      this.goals = this.goals.filter(goal => goal.progress != ProgressEnum.Completed);
    } else {
      console.log("showing all goals")
      this.goals = this.goalsListCopy
    }
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

  getProgressWidth(progress: ProgressEnum): string {
    if (progress === ProgressEnum.NotStarted) {
      return '0%';
    } else if (progress === ProgressEnum.InProgress) {
      return '50%';
    } else if (progress === ProgressEnum.Completed) {
      return '100%';
    } else {
      return '0%'; // Default width
    }
  }
  getProgressBarClass(progress: ProgressEnum): string {
    if (progress === ProgressEnum.NotStarted) {
      return 'bg-primary';
    } else if (progress === ProgressEnum.InProgress) {
      return 'bg-warning';
    } else if (progress === ProgressEnum.Completed) {
      return 'bg-success';
    } else {
      return ''; // No additional class
    }
  }

  open(goalId: string) {
    let text;
    if (confirm("Are you sure you want to delete this goal?") == true) {
      this.deleteGoal(goalId);
    } else {
      text = "You canceled!";
    }
	}
 
}



