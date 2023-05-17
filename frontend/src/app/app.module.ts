import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { RequestCache, RequestCacheWithMap } from './service/request-cache.service'

import { AuthService } from './service//auth.service';
// import { ConfigComponent } from './config/config.component';
// import { DownloaderComponent } from './downloader/downloader.component';
// import { HeroesComponent } from './heroes/heroes.component';
import { HttpErrorHandler } from './service/http-error-handler.service';
import { MessageService } from './service/message.service';
// import { MessagesComponent } from './messages/messages.component';
// import { PackageSearchComponent } from './package-search/package-search.component';
// import { UploaderComponent } from './uploader/uploader.component';
// import { httpInterceptorProviders } from './http-interceptors/index';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NavComponent } from './components/partials/navbar/nav.component';
import { SidebarComponent } from './components/partials/sidebar/sidebar.component';
import { CreateComponent } from './components/crudpage/create/create.component';
import { ReadComponent } from './components/crudpage/read/read.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoryComponent } from './components/category/category.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { UpdateComponent } from './components/crudpage/update/update.component';
import { SummaryComponent } from './components/summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    NavComponent,
    SidebarComponent,
    CreateComponent,
    ReadComponent,
    CategoryComponent,
    TimelineComponent,
    UpdateComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    HttpErrorHandler,
    MessageService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    // httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
