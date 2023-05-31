import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../../service/goal-service.service';
import { IUserModelAngular } from 'src/app/share/model/IUserModelAngular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  userObservable!: Observable<IUserModelAngular>;
  user: IUserModelAngular;

  constructor(private goalService: GoalService) {
    this.user = {} as IUserModelAngular;
  }

  ngOnInit() {
    this.userObservable = this.goalService.getUserById();
    this.userObservable.subscribe((result) => {
      this.user = result;
    })
  }

}
