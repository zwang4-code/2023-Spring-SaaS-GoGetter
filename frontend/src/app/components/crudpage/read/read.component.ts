import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero } from './hero';
import { GoalService } from '../../../service/goal-service.service';
import { IGoalModelAngular } from 'src/app/share/model/IGoalModelAngular';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  providers: [GoalService],
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {
  heroes: Hero[] = [];
  editHero: Hero | undefined; // the hero currently being edited
  heroName = '';
  goalName = '';
  goals: IGoalModelAngular[] = []

  constructor(private goalService: GoalService) {
  }

  ngOnInit() {
  }

  getGoals(): void {
    console.log("get t goa")
    this.goalService.getAllGoals().subscribe(goals => (this.goals = goals));
  }

  // search(searchTerm: string) {
  //   this.editHero = undefined;
  //   if (searchTerm) {
  //     this.goalService
  //       .searchHeroes(searchTerm)
  //       .subscribe(heroes => (this.heroes = heroes));
  //   } else {
  //     this.getGoals();
  //   }
  // }



  //   @ViewChild('heroEditInput')
  //   set heroEditInput(element: ElementRef<HTMLInputElement>) {
  //     if (element) {
  //       element.nativeElement.focus();
  //     }
  //   }

  //   ngOnInit() {
  //     this.getHeroes();

  //   }


  //   getHeroes(): void {
  //     this.goalService.getHeroes()
  //       .subscribe(heroes => (this.heroes = heroes));
  //   }


  //   delete(hero: Hero): void {
  //     this.heroes = this.heroes.filter(h => h !== hero);
  //     this.goalService
  //       .deleteHero(hero.id)
  //       .subscribe();
  //     /*
  //     // oops ... subscribe() is missing so nothing happens
  //     this.heroesService.deleteHero(hero.id);
  //     */
  //   }

  //   edit(heroName: string) {
  //     this.update(heroName);
  //     this.editHero = undefined;
  //   }

  //   search(searchTerm: string) {
  //     this.editHero = undefined;
  //     if (searchTerm) {
  //       this.goalService
  //         .searchHeroes(searchTerm)
  //         .subscribe(heroes => (this.heroes = heroes));
  //     } else {
  //       this.getHeroes();
  //     }
  //   }

  //   update(heroName: string) {
  //     if (heroName && this.editHero && this.editHero.name !== heroName) {
  //       this.goalService
  //         .updateHero({ ...this.editHero, name: heroName })
  //         .subscribe(hero => {
  //           // replace the hero in the heroes list with update from server
  //           const ix = hero ? this.heroes.findIndex(h => h.id === hero.id) : -1;
  //           if (ix > -1) {
  //             this.heroes[ix] = hero;
  //           }
  //         });
  //       this.editHero = undefined;
  //     }
  //   }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
