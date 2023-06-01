import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GoalService } from 'src/app/service/goal-service.service';
import { IUserModelAngular } from 'src/app/share/model/IUserModelAngular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-badges',
  templateUrl: './badges.component.html',
  styleUrls: ['./badges.component.css']
})
export class BadgesComponent {
  userObservable!: Observable<IUserModelAngular>;
  user: IUserModelAngular;

  constructor(private goalService: GoalService, private router: Router, activatedRoute: ActivatedRoute) {
    // This is for getting all of the goals
    this.user = {} as IUserModelAngular;
    this.userObservable = this.goalService.getUserById();
    this.userObservable.subscribe((result) => {
      this.user = result;
    })
  }
}
