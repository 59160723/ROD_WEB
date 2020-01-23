import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule,ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { HistoryComponent } from './components/history/history.component';
import { HistoryDetailComponent } from './components/history-detail/history-detail.component';
import { RouterModule } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';

//import { from } from 'rxjs';



@NgModule({
  declarations: [
    AppComponent,
    AttendanceComponent,
    HistoryComponent,
    HistoryDetailComponent,
    OverviewComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: AttendanceComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'historyDetail', component: HistoryDetailComponent },
      { path: 'overview', component: OverviewComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
