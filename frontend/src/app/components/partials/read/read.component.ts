import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../../service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  providers: [GoalService],
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  goalName = '';
  goals: IGoalModelAngular[] = []

  constructor(private goalService: GoalService) {
  }

  ngOnInit() {
  }

  getGoals(): void {
    console.log("get the goal")
    this.goalService.getAllGoals().subscribe(goals => (this.goals = goals));
  }
}