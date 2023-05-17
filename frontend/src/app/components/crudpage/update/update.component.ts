import { Component } from '@angular/core';
import { CategoryEnum } from '../../../share/enum/CategoryEnum'
import { GoalModel } from '../../../share/model/GoalModel'
import { GoalService } from '../../../service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  updatedGoal: GoalModel
  categories: CategoryEnum[];

  // constructor(private goalService: GoalService) {
  // }

  goals: IGoalModelAngular[] = []

  constructor(private goalService: GoalService) {
    // this.newGoal = new GoalModel('', '', '', CategoryEnum.Health)
    this.updatedGoal = new GoalModel()
    this.categories = Object.values(CategoryEnum);
  }

  submitted = false;

  getGoalById(): void {
    console.log("get goals by Id")
    this.goalService.getAllGoals().subscribe(goals => (this.goals = goals));
  }

  onSubmit() {
    this.submitted = true;
    console.log('\ngoal created')
    console.log('title: ', this.updatedGoal.title)
    console.log('description: ', this.updatedGoal.description)
    console.log('category: ', this.updatedGoal.category)

    this.updatedGoal.userId = "1"   // to FIX LATER 
    this.goalService
      .updateGoal('1', this.updatedGoal)
      .subscribe({
        next: (response: GoalModel) => {
          console.log('HTTP response: ', response);
        },
        error: (error) => {
          console.error('Error adding goal:', error);
          // Handle error scenario
        },
      });
  }

}
