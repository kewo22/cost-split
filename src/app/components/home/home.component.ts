import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventI } from 'src/app/interfaces/event.interface';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { initialEventState } from 'src/app/store/eventInfo.reducer';
import { selectEvents } from 'src/app/store/events/event.selector';
import { addEvents } from 'src/app/store/events/events.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events$: Observable<EventI[]> | null = null;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.events$ = this.store.select(selectEvents)
  }

  ngOnInit(): void {
    this.store.dispatch(addEventInfo(initialEventState));
  }

  onCreateNewEvent(): void {
    const id = +(Date.now() + ((Math.random() * 100000).toFixed()));
    const eventInfo: EventI = {
      date: new Date(),
      location: '',
      name: '',
      participants: [],
      spending: [],
      id: id,
      createdOn: new Date(),
      totalSpent: 0
    }
    this.store.dispatch(addEventInfo(eventInfo))
    this.store.dispatch(addEvents({ events: [eventInfo] })) // all events push
    this.router.navigate(['event']);
  }

}

