import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EventI } from 'src/app/interfaces/event.interface';
import { addEventInfo } from 'src/app/store/eventInfo.action';
import { selectEvents } from 'src/app/store/events/event.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  events$: Observable<EventI[]>;

  constructor(
    private store: Store,
    private router: Router
  ) {
    this.events$ = this.store.select(selectEvents)
  }

  ngOnInit(): void {
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
    this.router.navigate(['event']);
  }

}

