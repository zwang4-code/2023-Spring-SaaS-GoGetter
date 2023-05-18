import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReadComponent } from './components/partials/read/read.component';
import { CreateComponent } from './components/partials/create/create.component';
import { CategoryComponent } from './components/category/category.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SummaryComponent } from './components/summary/summary.component';
import { UpdateComponent } from './components/partials/update/update.component';


const routes: Routes = [
  // adding the route to home
  { path: '', component: WelcomeComponent },
  { path: 'read', component: ReadComponent },
  { path: 'create', component: CreateComponent },
  { path: 'category', component:CategoryComponent},
  { path: 'timeline', component:TimelineComponent},
  { path: 'summary', component:SummaryComponent},
  { path: 'update/:goalId', component:UpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
