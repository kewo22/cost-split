import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WidthFixerDirective } from "./directives/width-fixer.directive";
import { EventInfoComponent } from './components/event-info/event-info.component';
import { TuiModule } from "./shared/tui.module";
import { TuiCalendarComponent } from "@taiga-ui/core/components/calendar/calendar.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { eventInfoReducer, metaReducerLocalStorage } from "./store/eventInfo.reducer";
import { AddParticipantComponent } from "./components/add-participant/add-participant.component";
import { participantReducer } from "./store/participant/participant.reducer";
import { AddSpendingComponent } from "./components/add-spendings/add-spending.component";
import { SpendingComponent } from './components/spending/spending.component';
import { AssignParticipantComponent } from './components/assign-participant/assign-participant.component';
import { spendingReducer } from "./store/spending/spedning.reducer";
import { HomeComponent } from './components/home/home.component';
import { EventComponent } from './components/event/event.component';
import { eventReducer } from "./store/events/events.reducer";
import { SummaryComponent } from './components/summary/summary.component';
import { DueMinusIndicatorDirective } from "./directives/due-minus-indicator.directive";
import { EventLineComponent } from './components/event-line/event-line.component';
// import { TuiCalendarComponent } from "@taiga-ui/core";

@NgModule({
  declarations: [
    AppComponent,
    WidthFixerDirective,
    EventInfoComponent,
    AddParticipantComponent,
    AddSpendingComponent,
    SpendingComponent,
    AssignParticipantComponent,
    HomeComponent,
    EventComponent,
    SummaryComponent,
    DueMinusIndicatorDirective,
    EventLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TuiModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(
      {
        eventInfoEntries: eventInfoReducer,
        participantEntries: participantReducer,
        spendingEntries: spendingReducer,
        eventEntries: eventReducer,
      },
      {
        metaReducers: [metaReducerLocalStorage]
      }
    )
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
  entryComponents: [TuiCalendarComponent]
})
export class AppModule { }
