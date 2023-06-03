import { Component } from '@angular/core';
import { CategoryEnum } from '../../../share/enum/CategoryEnum'
import { GoalModel } from '../../../share/model/GoalModel';
import { GoalService } from '../../../service/goal-service.service';
import { UserModel } from '../../../share/model/UserModel';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  newGoal: GoalModel
  categories: CategoryEnum[];

  constructor(private goalService: GoalService, private location: Location) {
    this.newGoal = new GoalModel()
    this.categories = Object.values(CategoryEnum);
  }

  onSubmit() {
    console.log('\ngoal created')
    console.log('title: ', this.newGoal.title)
    console.log('description: ', this.newGoal.description)
    console.log('category: ', this.newGoal.category)

    this.goalService
      .addNewGoal(this.newGoal)
      .subscribe({
        next: (response: GoalModel) => {
          console.log('HTTP response: ', response);
          this.goalService.updateUser().subscribe({
            next: (userResponse) => {
              console.log('User updated:', userResponse);
              window.history.back();
            },
            error: (userError) => {
              console.error('Error updating user:', userError);
            },
          });
        },
        error: (error) => {
          console.error('Error adding goal:', error);
        },
      });
  }  

  goBack() {
    this.location.back();
  }
}