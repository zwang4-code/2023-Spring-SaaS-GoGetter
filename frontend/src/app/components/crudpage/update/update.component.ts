import { Component } from '@angular/core';
import { CategoryEnum } from '../../../share/enum/CategoryEnum'
import { GoalModel } from '../../../share/model/GoalModel'
import { ActivatedRoute } from '@angular/router';
import { GoalService } from '../../../service/goal-service.service';
import { ProgressEnum } from 'src/app/share/enum/ProgressEnum';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  categories: CategoryEnum[];
  progresses: ProgressEnum[];
  goal: GoalModel;

  constructor(private goalService: GoalService, private route: ActivatedRoute) {
    this.goal = new GoalModel()
    this.categories = Object.values(CategoryEnum);
    this.progresses = Object.values(ProgressEnum);
  }

  ngOnInit(): void {
    const goalId = this.route.snapshot.paramMap.get('goalId'); // Retrieve the goalId parameter from the route
    if (goalId !== null) {
      this.getGoalbyId(goalId.toString());
    }
  }

  getGoalbyId(goalId: string): void {
    this.goalService.getGoalById(goalId).subscribe((goal: GoalModel) => {
      this.goal = goal;
    });
  }

  onSubmit() {
    console.log('Updated Goals Info')
    console.log('title: ', this.goal.title)
    console.log('description: ', this.goal.description)
    console.log('category: ', this.goal.category)

    this.goalService
      .updateGoal(this.goal.goalId, this.goal)
      .subscribe({
        next: (response: GoalModel) => {
          console.log('HTTP response: ', response);
          window.history.back();
        },
        error: (error) => {
          console.error('Error updating goal:', error);
          // Handle error scenario
        },
      });
  }

}
