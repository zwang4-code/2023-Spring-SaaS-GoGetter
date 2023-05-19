import { Component } from '@angular/core';
import { CategoryEnum } from '../../../share/enum/CategoryEnum'
import { GoalModel } from '../../../share/model/GoalModel'
import { GoalService } from '../../../service/goal-service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  newGoal: GoalModel
  categories: CategoryEnum[];

  constructor(private goalService: GoalService) {
    this.newGoal = new GoalModel()
    this.categories = Object.values(CategoryEnum);
  }

  onSubmit() {
    console.log('\ngoal created')
    console.log('title: ', this.newGoal.title)
    console.log('description: ', this.newGoal.description)
    console.log('category: ', this.newGoal.category)

    this.newGoal.userId = "1"   // to FIX LATER 
    this.newGoal.reminder = false //reminder by default is false
    this.goalService
      .addNewGoal(this.newGoal)
      .subscribe({
        next: (response: GoalModel) => {
          console.log('HTTP response: ', response);
          window.history.back(); 
        },
        error: (error) => {
          console.error('Error adding goal:', error);
        },
      });
  }  
}