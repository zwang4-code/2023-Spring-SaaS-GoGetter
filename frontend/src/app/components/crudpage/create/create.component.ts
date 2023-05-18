import { Component } from '@angular/core';
import { CategoryEnum } from '../../../share/enum/CategoryEnum'
import { GoalModel } from '../../../share/model/GoalModel'
import { GoalService } from '../../../service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  newGoal: GoalModel
  categories: CategoryEnum[];

  // constructor(private goalService: GoalService) {
  // }

  goals: IGoalModelAngular[] = []

  constructor(private goalService: GoalService) {
    // this.newGoal = new GoalModel('', '', '', CategoryEnum.Health)
    this.newGoal = new GoalModel()
    this.categories = Object.values(CategoryEnum);
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    console.log('\ngoal created')
    console.log('title: ', this.newGoal.title)
    console.log('description: ', this.newGoal.description)
    console.log('category: ', this.newGoal.category)

    this.newGoal.userId = "1"   // to FIX LATER 
    this.newGoal.reminder = false
    this.goalService
      .addNewGoal(this.newGoal)
      .subscribe({
        next: (response: GoalModel) => {
          console.log('HTTP response: ', response);
          window.history.back(); 
        },
        error: (error) => {
          console.error('Error adding goal:', error);
          // Handle error scenario
        },
      });
  }  

  getGoals(): void {
    console.log("get goals")
    this.goalService.getAllGoals().subscribe(goals => (this.goals = goals));
  }




  // skyDog(): Hero {
  //   const myHero = new Hero(42, 'SkyDog',
  //     'Fetch any object at any distance',
  //     'Leslie Rollover');
  //   console.log('My hero is called ' + myHero.name); // "My hero is called SkyDog"
  //   return myHero;
  // }


  // constructor(

  // ) {}

  // ngOnInit(): void {

  // }


  // onSubmit(f: NgForm) {
  //   console.log(f.value);  // { first: '', last: '' }
  //   console.log(f.valid);  // false
  // }

  // onSubmit(): void {
  //   // Process checkout data here
  //   // this.items = this.cartService.clearCart();

  //   console.log('Your goal has been created. Title: ', this.createForm.value.title);
  //   this.createForm.reset();
  // }

}
