import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AccordionTypes } from 'src/app/enums/accordion-types.enum';
import { EventI } from 'src/app/interfaces/event.interface';
import { Participant } from 'src/app/interfaces/participant.interface';
import { selectEventInfo } from 'src/app/store/eventInfo.selector';
import { selectParticipant } from 'src/app/store/participant/participant.selector';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  readonly EVENT_INFO = AccordionTypes.EVENT_INFO;
  readonly ADD_PARTICIPANTS = AccordionTypes.ADD_PARTICIPANTS;
  readonly ADD_SPENDING = AccordionTypes.ADD_SPENDING;
  readonly PER_PERSON_SPLIT = AccordionTypes.PER_PERSON_SPLIT;

  eventInfo$: Observable<EventI>;
  participant$: Observable<Participant>;

  constructor(
    private store: Store
  ) {
    this.eventInfo$ = this.store.select(selectEventInfo)
    this.participant$ = this.store.select(selectParticipant)
  }

  ngOnInit(): void {
  }

  onAccordionStateClick(e: any) {
    // console.log(e)
  }

}
