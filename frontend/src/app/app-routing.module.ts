import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HomeComponent } from './components/home/home/home.component';
import { NavComponent } from './components/partials/navbar/nav.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ReadComponent } from './components/crudpage/read/read.component';
import { CreateComponent } from './components/crudpage/create/create.component';
import { MessagesComponent } from './components/crudpage/messages/messages.component';
import { CategoryComponent } from './components/category/category.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SummaryComponent } from './components/summary/summary.component';
import { UpdateComponent } from './components/crudpage/update/update.component';


const routes: Routes = [
  // adding the route to home
  { path: 'welcome', component: WelcomeComponent },
  //{ path: 'partials/nav', component: NavComponent }, // This is used for debugging we dont need this as a standalone route
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
